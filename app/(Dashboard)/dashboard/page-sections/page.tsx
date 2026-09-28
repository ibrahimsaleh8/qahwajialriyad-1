import { APP_URL, CurrentProjectId } from "@/lib/ProjectId";
import PageSectionsClient from "./_components/PageSectionsClient";
export const dynamic = "force-dynamic";

export interface PageSection {
  id: string;
  projectId: string;
  title: string;
  contentType: "CONTENT" | "KEYWORDS";
  content: string | null;
  image: string | null;
  keyword: string | null;
  keywordDescription: string | null;
  createdAt: string;
  updatedAt: string;
}

interface PageSectionsResponse {
  success: boolean;
  data: PageSection[];
}

export default async function PageSectionsPage() {
  let sections: PageSection[] = [];

  try {
    const res = await fetch(
      `${APP_URL}/api/project/${CurrentProjectId}/page-sections`,
      { cache: "no-store" },
    );

    if (res.ok) {
      const json: PageSectionsResponse = await res.json();
      if (json.success && Array.isArray(json.data)) {
        sections = json.data;
      }
    }
  } catch (err) {
    console.error("Failed to fetch page sections:", err);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">أقسام الصفحة</h1>
        <p className="mt-1 text-sm text-gray-500">
          أنشئ وأدر أقسام الصفحة بمحتوى نصي أو كلمات مفتاحية
        </p>
      </div>

      <PageSectionsClient
        projectId={CurrentProjectId}
        initialSections={sections}
      />
    </div>
  );
}
