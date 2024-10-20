import { signIn } from "@/auth/auth"
import {Button} from "@/components/ui/button";

export default function SignIn() {
    return (
        <>
            {/*<form
                action={async (formData) => {
                    "use server"
                    await signIn("resend", formData)
                }}
            >
                <input type="text" name="email" placeholder="Email"/>
                <button type="submit">Signin with Resend</button>
            </form>*/}
            <form
                action={async () => {
                    "use server"
                    await signIn("github")
                }}
            >
                <Button type="submit">Signin with GitHub</Button>
            </form>
        </>
    )
}
