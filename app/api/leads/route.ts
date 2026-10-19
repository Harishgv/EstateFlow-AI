import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseServer } from '@/lib/supabase';
import { qualify } from '@/lib/qualification';
const schema=z.object({name:z.string().trim().min(2).max(100),email:z.string().email().max(254),phone:z.string().max(30).optional(),budget:z.coerce.number().finite().positive().max(1e12),location:z.string().trim().min(2).max(150),timeline:z.enum(['immediate','1-3 months','3-6 months','exploring']),consent:z.literal(true)});
export async function POST(request:Request){
 try{
  const db=await supabaseServer();const {data:{user}}=await db.auth.getUser();
  if(!user)return NextResponse.json({error:'Sign in required'},{status:401});
  const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:'Invalid lead data',details:parsed.error.flatten()},{status:400});
  const {data:membership,error:membershipError}=await db.from('agency_members').select('agency_id').eq('user_id',user.id).limit(1).single();
  if(membershipError||!membership)return NextResponse.json({error:'Agency membership required'},{status:403});
  const lead=parsed.data;const rating=qualify(lead);
  const {data,error}=await db.from('leads').insert({agency_id:membership.agency_id,...lead,...rating,source:'manual'}).select('id,score,category,next_action').single();
  if(error)return NextResponse.json({error:'Unable to save lead'},{status:500});
  return NextResponse.json({lead:data},{status:201});
 }catch{return NextResponse.json({error:'Invalid request'},{status:400})}
}