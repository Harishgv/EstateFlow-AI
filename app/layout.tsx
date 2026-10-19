import type { ReactNode } from 'react';import './style.css';
export const metadata={title:'EstateFlow AI',description:'Real estate lead qualification and onboarding'};
export default function Layout({children}:{children:ReactNode}){return <html lang="en"><body>{children}</body></html>}