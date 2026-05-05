'use client';

import { authClient } from "@/app/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField, InputGroup } from "@heroui/react";
import { useState } from "react";

const SignInPage = () => {
     const [isVisible, setIsVisible] = useState(false);
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        const { data, error } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
            rememberMe: true,
            callbackURL: '/Component/welcome',
        });
        console.log('sign in data', { data, error });
        // shanto@gmail.com
        // 123456Lka

    };

    return (
        <div className="container mx-auto">
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) =>
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                            ? "Please enter a valid email address"
                            : null
                    }
                >
                    <Label>Email</Label>
                    <Input name="email" placeholder="john@example.com" />
                    <FieldError />
                </TextField>
                <TextField
                 isRequired
                    
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) return "Password must be at least 8 characters";
                        if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                        if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                        return null;
                    }}
                 className="w-full max-w-[280px]">
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroup.Input
                            className="w-full max-w-[280px]"
                            type={isVisible ? "text" : "password"}
                            name="password"
                            placeholder="Your Password"
                        />
                        <InputGroup.Suffix className="pr-0">
                            <Button
                                isIconOnly
                                aria-label={isVisible ? "Hide password" : "Show password"}
                                size="sm"
                                variant="ghost"
                                onPress={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>
                </TextField>
                

                <div className="flex gap-2">
                    <Button type="submit">
                        <Check />
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">Reset</Button>
                </div>
            </Form>
        </div>
    );
};

export default SignInPage;