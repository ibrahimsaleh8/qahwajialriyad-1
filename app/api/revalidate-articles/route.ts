import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    revalidatePath("/(main)/blog", "page");
    revalidatePath("/(main)/[title]", "page");
    revalidatePath("/(main)/", "page");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ message: "Revalidation done" });
  } catch (error) {
    return NextResponse.json({ message: "internal Error" }, { status: 500 });
  }
}
