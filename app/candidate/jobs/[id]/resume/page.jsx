import React from 'react'
import ResumeCandidateClient from '../../../../../components/candidate/resume/ResumeCandidateClient'

export default async function ResumePage({ params }) {
  const { id } = await params;

  return <ResumeCandidateClient jobId={id} />;
}
