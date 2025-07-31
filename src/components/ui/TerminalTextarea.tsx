'use client';

import { cn } from "@/lib/utils";
import { forwardRef, useState, useRef, useEffect } from "react";
import { Terminal } from "lucide-react";
import { useController, type FieldValues, type Control, type FieldPath } from "react-hook-form";

interface TerminalTextareaProps<T extends FieldValues> extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "name"> {
  name: FieldPath<T>;
  control: Control<T>;

  label?: string;
  prompt?: string;
  variant?: "default" | "error" | "success";
  size?: "sm" | "md" | "lg";

  minRows?: number;
  maxRows?: number;
  autoResize?: boolean;
  showCharCount?: boolean;
  maxLength?: number;

  customErrorMessage?: string;
  className?: string;
}

export const TerminalTextarea = forwardRef<HTMLTextAreaElement, TerminalTextareaProps<any>>(
  (
    {
      name,
      control,
      label,
      prompt = "input:~$",
      size = "md",
      variant = "default",
      minRows = 3,
      maxRows = 10,
      autoResize = true,
      showCharCount = false,
      maxLength,
      customErrorMessage,
      className,
      ...props
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const {
      field: { value, onChange, onBlur },
      fieldState: { error, isDirty, isTouched },
      formState: { isSubmitting, isSubmitted },
    } = useController({
      name,
      control,
    });

    const getActualVariant = () => {
      if (error && (isDirty || isTouched || isSubmitted)) return "error";
      if (!error && (isTouched || isSubmitted) && isDirty && value) return "success";
      return variant;
    };

    const actualVariant = getActualVariant();

    const adjustHeight = () => {
      if (textareaRef.current && autoResize) {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";

        const scrollHeight = textarea.scrollHeight;
        const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
        const minHeight = lineHeight * minRows;
        const maxHeight = lineHeight * maxRows;

        const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
        textarea.style.height = `${newHeight}px`;
      }
    };

    useEffect(() => {
      adjustHeight();
    }, [value, autoResize, minRows, maxRows]);

    useEffect(() => {
      adjustHeight();
    }, []);

    const getVariantStyles = () => {
      switch (actualVariant) {
        case "success":
          return {
            border: "border-gentle-success focus-within:border-gentle-success",
            prompt: "text-gentle-success bg-editor-elevated",
          };
        case "error":
          return {
            border: "border-gentle-error focus-within:border-gentle-error",
            prompt: "text-gentle-error bg-editor-elevated",
          };
        default:
          return {
            border: "border-current focus-within:border-warm-blue",
            prompt: "text-warm-blue bg-editor-sidebar",
          };
      }
    };

    const variantStyles = getVariantStyles();

    const getSizeStyles = () => {
      switch (size) {
        case "sm":
          return {
            padding: "px-2 py-1",
            text: "text-xs",
            prompt: "text-xs px-2 py-1",
            iconSize: 12,
          };
        case "lg":
          return {
            padding: "px-4 py-3",
            text: "text-base",
            prompt: "text-base px-4 py-3",
            iconSize: 16,
          };
        default:
          return {
            padding: "px-3 py-2",
            text: "text-sm",
            prompt: "text-sm px-3 py-2",
            iconSize: 14,
          };
      }
    };

    const sizeStyles = getSizeStyles();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
      if (autoResize) adjustHeight();
    };

    const handleBlur = () => {
      onBlur();
    };

    const charCount = (value || "").length;
    const isOverLimit = maxLength !== undefined && charCount > maxLength;

    const getErrorMessage = () => {
      if (!error) return null;
      if (customErrorMessage) return customErrorMessage;
      if (error.message) return `bash: ${error.message.toLowerCase()}`;
      return "bash: invalid input";
    };

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <label htmlFor={name as string} className="block text-sm font-terminal-ui text-current">
            {label}
          </label>
        )}

        <div
          className={cn(
            "border rounded-editor bg-current-surface terminal-transition overflow-hidden",
            variantStyles.border,
            isSubmitting && "opacity-50 cursor-wait"
          )}
        >
          {/* Clean Prompt Header - No Cursor */}
          <div
            className={cn(
              "flex items-center gap-2 border-b border-current",
              sizeStyles.prompt,
              variantStyles.prompt
            )}
          >
            <Terminal size={sizeStyles.iconSize} className="text-current" />
            <span className="font-terminal-mono font-code-medium">{prompt}</span>
          </div>

          {/* Clean Textarea */}
          <textarea
            id={name as string}
            ref={(node) => {
              textareaRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            className={cn(
              "w-full bg-transparent font-terminal-mono resize-none outline-none text-current terminal-cursor",
              sizeStyles.padding,
              sizeStyles.text,
              "placeholder:text-current-muted disabled:opacity-50 disabled:cursor-not-allowed",
              isOverLimit && "text-gentle-error"
            )}
            value={value || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            rows={minRows}
            maxLength={maxLength}
            {...props}
            style={{
              minHeight: `${minRows * 1.5}rem`,
              maxHeight: autoResize ? `${maxRows * 1.5}rem` : undefined,
            }}
          />
        </div>

        {/* Status Bar */}
        <div className="flex justify-between text-xs font-terminal-mono">
          {/* Error Message */}
          <div className="flex items-center gap-1">
            {error && (isDirty || isTouched || isSubmitted) && (
              <span className="text-gentle-error">{getErrorMessage()}</span>
            )}
            {!error && (isDirty || isSubmitted) && value && (
              <span className="text-gentle-success">✓ input validated</span>
            )}
          </div>

          {/* Character Count */}
          <div className="flex items-center">
            {showCharCount && (
              <span className={cn(isOverLimit ? "text-gentle-error" : "text-current-muted")}>
                {charCount}
                {maxLength ? ` / ${maxLength}` : ""}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

TerminalTextarea.displayName = "TerminalTextarea";
