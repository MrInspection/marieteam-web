import {SignInForm} from "@/app/(auth)/sign-in/sign-in-form";

export default async function SignInPage(props: { searchParams: {callbackUrl: string | undefined}}) {
    return <SignInForm callbackUrl={props.searchParams.callbackUrl ?? ""}/>
}
