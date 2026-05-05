'use client'
import { Button } from "@heroui/react";
import { signOut, useSession } from "../lib/auth-client";
import Link from 'next/link'

const Navber = () => {
    const { data, isPending } = useSession()
    if (isPending) {
        return <div>loading ...</div>
    }
    const user = data?.user;
    return (
        <>
            < nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg" >
                <header className="flex h-16 items-center justify-between px-6">
                    <div><Link href="/">logo</Link></div>
                    <ul className="flex items-center gap-4">
                        <li><Button><Link href="/auth/singin">Sign In</Link></Button></li>
                        <li></li>
                        <li><Link href="#">Features</Link></li>
                        <li><Link href="#">Pricing</Link></li>
                    </ul>
                    <div>
                        {user ?
                            <>
                                <p>Welcome {user.name}</p>
                                <Button
                                    onClick={()=>signOut()}
                                >Singout</Button>
                            </>
                            :
                            <>
                                <Button><Link href="/auth/singup">Sign Up</Link></Button>
                            </>
                        }
                    </div>
                </header>
            </nav >
        </>
    );
};

export default Navber;