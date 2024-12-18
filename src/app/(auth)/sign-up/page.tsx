import {SignUpForm} from "@/app/(auth)/sign-up/sign-up-form";

export default async function SignUpPage(props: { searchParams: Promise<{ callbackUrl: string | undefined }> }) {
  return <SignUpForm callbackUrl={(await props.searchParams).callbackUrl ?? "/"}/>;
}
