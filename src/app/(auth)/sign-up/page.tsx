import {SignUpForm} from "@/app/(auth)/sign-up/sign-up-form";

export default function SignUpPage(props: { searchParams: { callbackUrl: string | undefined } }) {
  return <SignUpForm callbackUrl={props.searchParams.callbackUrl ?? "/"}/>
}
