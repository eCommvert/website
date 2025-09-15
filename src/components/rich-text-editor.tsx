"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Link, 
  Image as ImageIcon,
  Save,
  Eye,
  Edit
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export const RichTextEditor = ({ value, onChange, placeholder, label }: RichTextEditorProps) => {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const formatText = (format: string) => {
    switch (format) {
      case "bold":
        insertText("**", "**");
        break;
      case "italic":
        insertText("*", "*");
        break;
      case "underline":
        insertText("<u>", "</u>");
        break;
      case "quote":
        insertText("> ");
        break;
      case "list":
        insertText("- ");
        break;
      case "orderedList":
        insertText("1. ");
        break;
      case "link":
        const url = prompt("Enter URL:");
        if (url) {
          insertText(`[${value.substring(textareaRef.current?.selectionStart || 0, textareaRef.current?.selectionEnd || 0) || "link"}](${url})`);
        }
        break;
    }
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground">$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4">$2</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="space-y-4">
      {label && <Label className="text-sm font-medium">{label}</Label>}
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Rich Text Editor</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={isPreview ? "outline" : "default"}
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
              >
                {isPreview ? <Edit className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {isPreview ? "Edit" : "Preview"}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Toolbar */}
          {!isPreview && (
            <div className="flex flex-wrap items-center gap-2 p-2 border rounded-lg bg-muted/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText("bold")}
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText("italic")}
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText("underline")}
                title="Underline"
              >
                <Underline className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-border mx-1" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText("quote")}
                title="Quote"
              >
                <Quote className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText("list")}
                title="Bullet List"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText("orderedList")}
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-border mx-1" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText("link")}
                title="Link"
              >
                <Link className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Editor/Preview */}
          {isPreview ? (
            <div 
              className="min-h-[200px] p-4 border rounded-lg bg-background prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
            />
          ) : (
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="min-h-[200px] font-mono text-sm"
            />
          )}

          {/* Help Text */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Formatting:</strong> **bold**, *italic*, <u>underline</u></p>
            <p><strong>Lists:</strong> - bullet point, 1. numbered list</p>
            <p><strong>Quote:</strong> &gt; quoted text</p>
            <p><strong>Links:</strong> [text](url)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
