"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500 text-emerald-600">
              ✓
            </div>
            {description && (
              <ToastDescription className="text-[11px] sm:text-xs text-slate-700">
                {description}
              </ToastDescription>
            )}
          </div>
          <ToastClose />
          {action}
        </Toast>
      ))}

      <ToastViewport />
    </ToastProvider>
  )
}