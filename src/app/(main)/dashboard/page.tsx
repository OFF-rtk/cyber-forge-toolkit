'use client';

import { useState, useEffect } from 'react';
import { TerminalBreadcrumb } from '@/components/ui/TerminalBreadcrumb';
import { TerminalContainer } from '@/components/ui/TerminalContainer';
import TerminalCard from '@/components/ui/TerminalCard';
import { TerminalFormInput } from '@/components/ui/TerminalFormInput';
import { TerminalSelect } from '@/components/ui/TerminalSelect';
import { TerminalTextarea } from '@/components/ui/TerminalTextarea';
import TerminalButton from '@/components/ui/TerminalButton';
import { TerminalBadge } from '@/components/ui/TerminalBadge';
import { TerminalCommandPalette } from '@/components/ui/TerminalCommandPalette';
import { TerminalTooltip } from '@/components/ui/TerminalTooltip';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useModal } from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';
import { 
  Search, 
  Settings, 
  HelpCircle, 
  RefreshCw, 
  Download, 
  Upload,
  Terminal,
  FileText,
  Users,
  BarChart
} from 'lucide-react';

// Form validation schema
const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Please select your role'),
  feedback: z.string().min(10, 'Feedback must be at least 10 characters'),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

export default function DashboardPage() {
  const { modal } = useModal();
  const { toast } = useToast();

  // Command palette state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
      feedback: '',
    },
  });

  const onSubmit = async (data: FeedbackForm) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Feedback submitted:', data);
    
    toast.success(
      'Feedback Submitted!',
      'Thank you for your feedback. We\'ll review it shortly and get back to you.'
    );
    
    reset();
  };

  const roleOptions = [
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'manager', label: 'Product Manager' },
    { value: 'other', label: 'Other' },
  ];

  // Command palette commands
  const commands = [
    {
      id: 'search-components',
      label: 'Search Components',
      description: 'Find specific UI components',
      icon: <Search size={16} className="text-warm-blue" />,
      category: 'Navigation',
      shortcut: '⌘K',
      keywords: ['find', 'component', 'search'],
      action: () => {
        toast.info('Search', 'Component search would open here');
      }
    },
    {
      id: 'view-analytics',
      label: 'View Analytics',
      description: 'Open dashboard analytics',
      icon: <BarChart size={16} className="text-warm-green" />,
      category: 'Dashboard',
      keywords: ['analytics', 'stats', 'metrics'],
      action: () => {
        document.querySelector('.analytics-cards')?.scrollIntoView({ behavior: 'smooth' });
        toast.info('Navigation', 'Scrolled to analytics section');
      }
    },
    {
      id: 'open-feedback',
      label: 'Open Feedback Form',
      description: 'Navigate to feedback section',
      icon: <FileText size={16} className="text-warm-orange" />,
      category: 'Forms',
      keywords: ['feedback', 'form', 'submit'],
      action: () => {
        document.querySelector('.feedback-form')?.scrollIntoView({ behavior: 'smooth' });
        toast.info('Navigation', 'Scrolled to feedback form');
      }
    },
    {
      id: 'refresh-data',
      label: 'Refresh Dashboard',
      description: 'Reload all dashboard data',
      icon: <RefreshCw size={16} className="text-warm-blue" />,
      category: 'Actions',
      shortcut: '⌘R',
      keywords: ['refresh', 'reload', 'update'],
      action: () => {
        toast.success('Refresh', 'Dashboard data refreshed successfully!');
      }
    },
    {
      id: 'export-data',
      label: 'Export Data',
      description: 'Download dashboard data as CSV',
      icon: <Download size={16} className="text-gentle-success" />,
      category: 'Actions',
      keywords: ['export', 'download', 'csv', 'data'],
      action: () => {
        toast.info('Export', 'Data export would start here');
      }
    },
    {
      id: 'import-data',
      label: 'Import Data',
      description: 'Upload data from file',
      icon: <Upload size={16} className="text-warm-purple" />,
      category: 'Actions',
      keywords: ['import', 'upload', 'file'],
      action: () => {
        toast.info('Import', 'File upload dialog would open here');
      }
    },
    {
      id: 'settings',
      label: 'Dashboard Settings',
      description: 'Configure dashboard preferences',
      icon: <Settings size={16} className="text-current-muted" />,
      category: 'Settings',
      shortcut: '⌘,',
      keywords: ['settings', 'preferences', 'config'],
      action: () => {
        toast.info('Settings', 'Dashboard settings would open here');
      }
    },
    {
      id: 'help',
      label: 'Help & Documentation',
      description: 'View help documentation',
      icon: <HelpCircle size={16} className="text-warm-blue" />,
      category: 'Help',
      shortcut: '?',
      keywords: ['help', 'docs', 'documentation'],
      action: () => {
        toast.info('Help', 'Documentation would open here');
      }
    },
    {
      id: 'view-users',
      label: 'View Users',
      description: 'Navigate to user management',
      icon: <Users size={16} className="text-warm-green" />,
      category: 'Navigation',
      keywords: ['users', 'management', 'people'],
      action: () => {
        toast.info('Navigation', 'User management would open here');
      }
    },
    {
      id: 'terminal-mode',
      label: 'Toggle Terminal Mode',
      description: 'Switch to full terminal interface',
      icon: <Terminal size={16} className="text-warm-blue" />,
      category: 'Settings',
      shortcut: '⌘T',
      keywords: ['terminal', 'mode', 'interface'],
      action: () => {
        toast.success('Terminal Mode', 'Terminal interface activated!');
      }
    }
  ];

  // Global keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command palette with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showDetailedFeedbackModal = () => {
    modal.custom(
      <div className="space-y-6">
        <p className="text-current-muted font-terminal-mono text-sm">
          This modal demonstrates our TerminalModal component in action. 
          In a real application, this could contain a more detailed feedback form 
          or additional component demonstrations.
        </p>
        
        <div className="space-y-4">
          <h3 className="text-lg font-terminal-ui font-code-medium text-current">
            What would you like to see improved?
          </h3>
          
          <div className="space-y-3 font-terminal-mono text-sm">
            <label className="flex items-center gap-3 p-2 rounded-editor hover:bg-editor-elevated transition-colors">
              <input type="checkbox" className="rounded border border-current bg-transparent" />
              <span>Component Documentation</span>
            </label>
            <label className="flex items-center gap-3 p-2 rounded-editor hover:bg-editor-elevated transition-colors">
              <input type="checkbox" className="rounded border border-current bg-transparent" />
              <span>More Color Variants</span>
            </label>
            <label className="flex items-center gap-3 p-2 rounded-editor hover:bg-editor-elevated transition-colors">
              <input type="checkbox" className="rounded border border-current bg-transparent" />
              <span>Additional Components</span>
            </label>
            <label className="flex items-center gap-3 p-2 rounded-editor hover:bg-editor-elevated transition-colors">
              <input type="checkbox" className="rounded border border-current bg-transparent" />
              <span>Better Examples</span>
            </label>
          </div>
        </div>
      </div>,
      {
        title: 'Detailed Component Feedback',
        size: 'lg',
        confirmText: 'Submit Feedback',
        cancelText: 'Close',
        variant: 'info',
        onConfirm: () => {
          toast.success(
            'Detailed Feedback Received!',
            'Your suggestions have been recorded. Thank you for helping us improve!'
          );
        }
      }
    );
  };

  const showWarningDemo = () => {
    modal.warning(
      'Reset Form Data?',
      'This will clear all your current form inputs. This action cannot be undone.',
      () => {
        reset();
        toast.info('Form Reset', 'All form fields have been cleared.');
      }
    );
  };

  const showDangerDemo = () => {
    modal.danger(
      'Delete All Feedback',
      'This will permanently delete all stored feedback data. This action cannot be undone.',
      () => {
        toast.error('Delete Action', 'In a real app, this would delete all feedback data.');
      }
    );
  };

  // ✅ EXPOSE: Command palette control for navbar
  useEffect(() => {
    // Make setIsCommandPaletteOpen available globally
    (window as any).openCommandPalette = () => setIsCommandPaletteOpen(true);
    
    return () => {
      delete (window as any).openCommandPalette;
    };
  }, []);

  return (
    <div className="px-6 py-12">
      {/* ✅ KEEP: Command Palette - Still accessible via ⌘K */}
      <TerminalCommandPalette
        commands={commands}
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        placeholder="Search commands... (Try 'analytics', 'refresh', or 'help')"
        maxResults={8}
        showCategories={true}
      />

      {/* ❌ REMOVED: Command palette button section completely */}

      {/* ASCII Art + Neofetch Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ASCII Art */}
          <div className="flex justify-center lg:justify-start">
            <pre className="text-warm-blue font-terminal-mono text-2xl leading-tight">
{`TTTTTTTTTTTTTTTTTTTTTTTTTTTTT
T:::::::::::::::::::::::::::T
T:::::::::::::::::::::::::::T
T::::::TTTTTTTTTTTTTTT::::::T
   TTTTTT  T:::::T  TTTTTT      
           T:::::T              
           T:::::T              
           T:::::T              
           T:::::T              
           T:::::T              
           T:::::T              
           T:::::T              
         TT:::::::TT            
         T:::::::::T            
         T:::::::::T            
         TTTTTTTTTTT            `}
            </pre>
          </div>

          {/* Neofetch Info */}
          <div className="font-terminal-mono text-sm space-y-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-warm-green">user</span>
              <span className="text-white">@</span>
              <span className="text-warm-blue">terminal-ui</span>
            </div>
            <div className="border-b border-gray-600 w-full mb-4"></div>
            
            <div className="space-y-1">
              <div><span className="text-warm-orange">OS:</span> <span className="text-white">Production Ready</span></div>
              <div><span className="text-warm-orange">Host:</span> <span className="text-white">Terminal UI Toolkit</span></div>
              <div><span className="text-warm-orange">Version:</span> <span className="text-white">v1.0.0</span></div>
              <div><span className="text-warm-orange">Components:</span> <span className="text-white">18+ Built</span></div>
              <div><span className="text-warm-orange">Framework:</span> <span className="text-white">React + TypeScript</span></div>
              <div><span className="text-warm-orange">Theme:</span> <span className="text-white">Refined Terminal</span></div>
              <div><span className="text-warm-orange">Validation:</span> <span className="text-white">React Hook Form</span></div>
              <div><span className="text-warm-Orange">Accessibility:</span> <span className="text-white">WCAG Compliant</span></div>
              <div><span className="text-warm-orange">Status:</span> <span className="text-gentle-success">🟢 Live & Ready</span></div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-600">
              <span className="text-warm-blue">user@terminal-ui:~$ </span>
              <span className="text-white">showcase --components</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="py-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent max-w-6xl mx-auto"></div>
      </div>

      {/* Main Dashboard Content */}
      <TerminalContainer 
        title="Analytics Dashboard - Terminal UI"
        size="lg"
        className="mb-8"
      >
        {/* Breadcrumbs */}
        <TerminalBreadcrumb className="mb-6" />

        {/* Analytics Cards Grid */}
        <div className="analytics-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <TerminalCard
            title="Active Users"
            value="1,234"
            description="Users online this month"
            status="success"
          />
          <TerminalCard
            title="Form Submissions"
            value="89%"
            description="Completion rate"
            status="success"
          />
          <TerminalCard
            title="Performance"
            value="45ms"
            description="Average response time"
            status="info"
          />
          <TerminalCard
            title="Error Rate"
            value="0.2%"
            description="System errors today"
            status="warning"
          />
        </div>

        {/* Dashboard Content with Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TerminalCard title="Recent Activity" status="info">
            <div className="space-y-3 font-terminal-mono text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gentle-success">✓</span>
                  <span>Survey completed by john@dev.com</span>
                </div>
                <TerminalBadge variant="success" size="sm">New</TerminalBadge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gentle-success">✓</span>
                  <span>Form validation passed - 98% rate</span>
                </div>
                <TerminalBadge variant="info" size="sm">3</TerminalBadge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-warm-blue">→</span>
                  <span>New component feedback received</span>
                </div>
                <TerminalBadge variant="warning" size="sm">5</TerminalBadge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gentle-success">✓</span>
                  <span>Dashboard metrics updated</span>
                </div>
                <TerminalBadge dot variant="success" />
              </div>
            </div>
          </TerminalCard>

          <TerminalCard title="System Status" status="success">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-terminal-mono text-sm">API Response</span>
                <div className="flex items-center gap-2">
                  <span className="text-gentle-success font-code-medium">Healthy</span>
                  <TerminalBadge dot variant="success" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-terminal-mono text-sm">Database</span>
                <div className="flex items-center gap-2">
                  <span className="text-gentle-success font-code-medium">Connected</span>
                  <TerminalBadge dot variant="success" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-terminal-mono text-sm">Cache</span>
                <div className="flex items-center gap-2">
                  <span className="text-gentle-warning font-code-medium">Warming</span>
                  <TerminalBadge dot variant="warning" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-terminal-mono text-sm">Components</span>
                <div className="flex items-center gap-2">
                  <span className="text-gentle-success font-code-medium">All Ready</span>
                  <TerminalBadge variant="success" size="sm">18+</TerminalBadge>
                </div>
              </div>
            </div>
          </TerminalCard>
        </div>

        {/* Interactive Demo Buttons */}
        <div className="p-4 border border-current rounded-editor bg-editor-elevated">
          <h3 className="font-terminal-ui font-code-medium text-current mb-4">
            Interactive Component Demos
          </h3>
          <div className="flex flex-wrap gap-3">
            <TerminalTooltip content="Shows an informational toast notification">
              <TerminalButton
                variant="default"
                onClick={() => toast.info('Info Toast', 'This is an informational message.')}
              >
                Show Info Toast
              </TerminalButton>
            </TerminalTooltip>
            
            <TerminalTooltip content="Displays a success notification">
              <TerminalButton
                variant="success"
                onClick={() => toast.success('Success Toast', 'Operation completed successfully!')}
              >
                Show Success Toast
              </TerminalButton>
            </TerminalTooltip>
            
            <TerminalTooltip content="Opens a warning confirmation modal">
              <TerminalButton
                variant="warning"
                onClick={showWarningDemo}
              >
                Show Warning Modal
              </TerminalButton>
            </TerminalTooltip>
            
            <TerminalTooltip content="Shows a destructive action modal">
              <TerminalButton
                variant="danger"
                onClick={showDangerDemo}
              >
                Show Danger Modal
              </TerminalButton>
            </TerminalTooltip>

            {/* ❌ REMOVED: Command palette button from demo section */}
          </div>
        </div>
      </TerminalContainer>

      {/* Feedback Form Section */}
      <TerminalContainer 
        title="Component Feedback - Terminal UI"
        size="lg"
        variant="elevated"
        className="feedback-form"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-terminal-ui font-code-semibold text-current mb-3">
            Share Your Terminal UI Experience
          </h2>
          <p className="text-current-muted font-terminal-mono text-sm max-w-2xl mx-auto">
            Help us improve our terminal UI components by sharing your feedback. 
            Your input helps us create better developer experiences.
          </p>
        </div>

        {/* Form with Bottom Tooltips */}
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input with Bottom Tooltip */}
            <div className="relative group">
              <TerminalFormInput
                name="name"
                control={control}
                label="Your Name"
                prompt="name:~$"
                placeholder="Enter your name"
              />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-current-surface/95 text-current text-xs font-terminal-mono rounded-editor border border-current opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                Enter your full name as it appears on your profile
              </div>
            </div>
            
            {/* Email Input with Bottom Tooltip */}
            <div className="relative group">
              <TerminalFormInput
                name="email"
                control={control}
                label="Email Address"
                prompt="email:~$"
                type="email"
                placeholder="your@email.com"
              />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-current-surface/95 text-current text-xs font-terminal-mono rounded-editor border border-current opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                We'll use this email to follow up on your feedback if needed
              </div>
            </div>
          </div>

          {/* Role Select with Bottom Tooltip */}
          <div className="relative group">
            <TerminalSelect
              name="role"
              control={control}
              label="Your Role"
              prompt="role:~$"
              options={roleOptions}
              placeholder="Select your role"
            />
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-current-surface/95 text-current text-xs font-terminal-mono rounded-editor border border-current opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              Select your primary role to help us understand your perspective
            </div>
          </div>

          {/* Feedback Textarea with Bottom Tooltip */}
          <div className="relative group">
            <TerminalTextarea
              name="feedback"
              control={control}
              label="Your Feedback"
              placeholder="Share your thoughts about the terminal UI components..."
              minRows={4}
              maxRows={6}
              showCharCount
              maxLength={500}
            />
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-current-surface/95 text-current text-xs font-terminal-mono rounded-editor border border-current opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              Share detailed thoughts about the components, design, or functionality
            </div>
          </div>

          {/* Button section with working tooltips */}
          <div className="flex gap-4 justify-center">
            <TerminalTooltip content="Submit your feedback for review" placement="bottom">
              <TerminalButton
                type="submit"
                variant="success"
                disabled={isSubmitting}
                className="min-w-32"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </TerminalButton>
            </TerminalTooltip>
            
            <TerminalTooltip content="Open detailed feedback form with additional options" placement="bottom">
              <TerminalButton
                type="button"
                variant="default"
                onClick={showDetailedFeedbackModal}
                className="min-w-32"
              >
                Detailed Feedback
              </TerminalButton>
            </TerminalTooltip>
            
            <TerminalTooltip content="Clear all form fields and start over" placement="bottom">
              <TerminalButton
                type="button"
                variant="ghost"
                onClick={() => {
                  reset();
                  toast.info('Form Cleared', 'All form fields have been reset.');
                }}
                className="min-w-32"
              >
                Clear Form
              </TerminalButton>
            </TerminalTooltip>
          </div>
        </form>
      </TerminalContainer>
    </div>
  );
}
