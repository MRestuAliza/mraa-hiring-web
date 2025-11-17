import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

export default function CandidateTable({ candidates }) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader className="[&_th]:py-6 bg-neutral-50">
          <TableRow className="">
            <TableHead className="w-[50px]">
              <Checkbox id="select-all" className="" />
            </TableHead>
            <TableHead className="uppercase">Nama Lengkap</TableHead>
            <TableHead className="uppercase">Email Address</TableHead>
            <TableHead className="uppercase">Phone Numbers</TableHead>
            <TableHead className="uppercase">Date of Birth</TableHead>
            <TableHead className="uppercase">Domicile</TableHead>
            <TableHead className="uppercase">Gender</TableHead>
            <TableHead className="uppercase">Link Linkedin</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id} className="[&_td]:py-4">
              <TableCell>
                <Checkbox id={`select-${candidate.id}`} />
              </TableCell>
              <TableCell className="font-medium">{candidate.name}</TableCell>
              <TableCell>{candidate.email}</TableCell>
              <TableCell>{candidate.phone}</TableCell>
              <TableCell>{candidate.dob}</TableCell>
              <TableCell>{candidate.domicile}</TableCell>
              <TableCell>{candidate.gender}</TableCell>
              <TableCell>
                <a
                  href={candidate.linkedin}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {candidate.linkedin}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
