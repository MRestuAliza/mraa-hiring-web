import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <header className="flex w-full h-14 shrink-0 items-center gap-2 border-b px-4 lg:px-6">
          <Separator
            orientation="vertical"
            className="mx-2 h-6"
          />
          <h1 className="text-base font-medium">Documents</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
              <a
                href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
                rel="noopener noreferrer"
                target="_blank"
                className="dark:text-foreground"
              >
                GitHub
              </a>
            </Button>
          </div>
        </header>
  );
}
