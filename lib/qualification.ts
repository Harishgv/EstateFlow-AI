export type LeadInput={name:string;email:string;phone?:string;budget:number;location:string;timeline:'immediate'|'1-3 months'|'3-6 months'|'exploring';consent:boolean};
export function qualify(lead:LeadInput){
 const score=(lead.budget>=10000000?35:lead.budget>=4000000?25:10)+({immediate:40,'1-3 months':30,'3-6 months':15,exploring:0}[lead.timeline])+(lead.location.trim()?15:0)+(lead.phone?10:0);
 return {score,category:score>=75?'hot':score>=45?'warm':'cold',next_action:score>=75?'Call within 1 business hour':score>=45?'Offer a property shortlist':'Send a helpful buyer guide'} as const;
}