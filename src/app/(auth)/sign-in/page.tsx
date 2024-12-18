import {SignInForm} from "@/app/(auth)/sign-in/sign-in-form";

export default async function SignInPage(props: { searchParams: Promise<{ callbackUrl: string | undefined }> }) {
  return <SignInForm callbackUrl={(await props.searchParams).callbackUrl ?? ""}/>;
}
