"use client";

import { useSession } from "@/app/lib/auth-client";
import { Card, Avatar, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const Welcome = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    if (isPending) return null;

    const name = session?.user?.name || "User";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-zinc-900">
            
            <Card className="w-80 p-6 text-center bg-zinc-900/80 backdrop-blur border border-zinc-800 shadow-xl">
                
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                    <Avatar
                        name={name}
                        src={session?.user?.image}
                        size="lg"
                        className="ring-2 ring-violet-500"
                    />
                </div>

                {/* Text */}
                <h1 className="text-2xl font-bold text-white">
                    Welcome back
                </h1>

                <p className="text-zinc-400 mt-1">
                    {name}
                </p>

                {/* Button */}
                <Button
                    className="mt-5 w-full bg-violet-600 hover:bg-violet-700 text-white"
                    onPress={() => router.push("/dashboard")}
                >
                    Continue
                </Button>

            </Card>
        </div>
    );
};

export default Welcome;