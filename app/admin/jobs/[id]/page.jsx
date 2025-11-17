import ManageCandidatesClient from "../../../../components/admin/candidate/ManageCandidatesClient";

export default async function Page({ params }) {
  const { id } = await params;

  return <ManageCandidatesClient jobId={id} />;
}
