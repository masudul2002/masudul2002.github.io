import CvGenerator from "@/components/cv/CvGenerator";
import { getProfileData } from "@/lib/data";

export const metadata = {
  title: "CV Generator | MD. MASUDUL HASAN",
  description: "Generate a tailored ATS-friendly CV for different roles.",
};

export const revalidate = 3600;

export default async function CvPage() {
  const data = await getProfileData();
  return <CvGenerator data={data} />;
}
