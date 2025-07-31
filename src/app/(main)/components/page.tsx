'use client';

import { useState } from 'react';
import { TerminalContainer } from '@/components/ui/TerminalContainer';
import { TerminalTable } from '@/components/ui/TerminalTable';
import { TerminalPagination } from '@/components/ui/TerminalPagination';
import { TerminalBadge } from '@/components/ui/TerminalBadge';
import { TerminalButton } from '@/components/ui/TerminalButton';
import { TerminalAccordian } from '@/components/ui/TerminalAccordian';
import { TerminalTabs } from '@/components/ui/TerminalTab';
import { Terminal, Filter } from 'lucide-react';

// Component data
const componentsData = [
  {
    name: 'TerminalFormInput',
    category: 'Form',
    features: [
      'Connected command-line feel',
      'Real-time validation',
      'Custom prompts (user:~$, git:~$)',
      'Character count display',
      'Multiple input types'
    ],
    variants: ['sm', 'md', 'lg'],
    status: 'Complete',
    description: 'Text input with authentic terminal prompt styling'
  },
  {
    name: 'TerminalSelect',
    category: 'Form',
    features: [
      'Searchable dropdown',
      'Keyboard navigation',
      'Custom option rendering',
      'Terminal prompt integration',
      'Validation support'
    ],
    variants: ['sm', 'md', 'lg'],
    status: 'Complete',
    description: 'Dropdown select with terminal aesthetics'
  },
  {
    name: 'TerminalTextarea',
    category: 'Form',
    features: [
      'Auto-resize capability',
      'Character count tracking',
      'Clean minimal design',
      'Validation integration',
      'Row limit controls'
    ],
    variants: ['sm', 'md', 'lg'],
    status: 'Complete',
    description: 'Multi-line text input without prompt header'
  },
  {
    name: 'TerminalButton',
    category: 'Interactive',
    features: [
      '5 style variants',
      'Loading states',
      'Icon support',
      'Size variants',
      'Keyboard accessible'
    ],
    variants: ['default', 'success', 'warning', 'danger', 'ghost'],
    status: 'Complete',
    description: 'Action buttons with terminal styling'
  },
  {
    name: 'TerminalModal',
    category: 'Interactive',
    features: [
      'Traffic light controls',
      'Keyboard shortcuts (ESC)',
      'Size variants',
      'Custom content support',
      'Backdrop blur effect'
    ],
    variants: ['sm', 'md', 'lg', 'xl', 'full'],
    status: 'Complete',
    description: 'Modal dialogs with macOS-style window controls'
  },
  {
    name: 'TerminalToast',
    category: 'Interactive',
    features: [
      'Auto-dismiss timing',
      'Action button support',
      'Slide animations',
      'Multiple variants',
      'Queue management'
    ],
    variants: ['success', 'warning', 'error', 'info'],
    status: 'Complete',
    description: 'Notification toasts with smooth animations'
  },
  {
    name: 'TerminalNavbar',
    category: 'Navigation',
    features: [
      'Floating glass style',
      'Next.js routing integration',
      'Active route detection',
      'Mobile responsive',
      'Brand customization'
    ],
    variants: ['standard', 'floating'],
    status: 'Complete',
    description: 'Navigation bar with glassmorphism effects'
  },
  {
    name: 'TerminalBreadcrumb',
    category: 'Navigation',
    features: [
      'Auto-generate from URL',
      'Custom breadcrumb paths',
      'Next.js integration',
      'Separator customization',
      'Home icon support'
    ],
    variants: ['default'],
    status: 'Complete',
    description: 'Breadcrumb navigation with path generation'
  },
  {
    name: 'TerminalCard',
    category: 'Layout',
    features: [
      'Traffic light indicators',
      'Status variants',
      'Value display formatting',
      'Custom content support',
      'Compact mode'
    ],
    variants: ['default', 'success', 'warning', 'error', 'info'],
    status: 'Complete',
    description: 'Content cards with status indicators'
  },
  {
    name: 'TerminalContainer',
    category: 'Layout',
    features: [
      'macOS-style traffic lights',
      'Window title customization',
      'Size variants',
      'Background variants',
      'Shadow effects'
    ],
    variants: ['default', 'elevated', 'panel'],
    status: 'Complete',
    description: 'Container with macOS window styling'
  },
  {
    name: 'TerminalTabs',
    category: 'Navigation',
    features: [
      'Badge support',
      'Keyboard navigation',
      'Size variants',
      'Custom content',
      'Active state management'
    ],
    variants: ['sm', 'md', 'lg'],
    status: 'Complete',
    description: 'Tabbed content navigation'
  },
  {
    name: 'TerminalAccordion',
    category: 'Layout',
    features: [
      'Single/multi expand modes',
      'Smooth animations',
      'Keyboard accessible',
      'Custom content support',
      'Status variants'
    ],
    variants: ['default', 'success', 'error'],
    status: 'Complete',
    description: 'Expandable content sections'
  },
  {
    name: 'TerminalBadge',
    category: 'Display',
    features: [
      'Text and dot variants',
      'Size options',
      'Status colors',
      'Inline display',
      'Counter support'
    ],
    variants: ['default', 'success', 'warning', 'error', 'info'],
    status: 'Complete',
    description: 'Status indicators and labels'
  },
  {
    name: 'TerminalTable',
    category: 'Data',
    features: [
      'Multi-column sorting',
      'Custom cell rendering',
      'Loading states',
      'Row click handling',
      'Responsive scrolling'
    ],
    variants: ['sm', 'md', 'lg'],
    status: 'Complete',
    description: 'Data table with sorting capabilities'
  },
  {
    name: 'TerminalPagination',
    category: 'Data',
    features: [
      'Page navigation',
      'Size variants',
      'Info display',
      'Keyboard navigation',
      'Server integration ready'
    ],
    variants: ['sm', 'md', 'lg'],
    status: 'Complete',
    description: 'Data pagination navigation'
  }
];

// Table columns
const componentColumns = [
  { 
    key: 'name', 
    header: 'Component', 
    sortable: true,
    width: '200px',
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <Terminal size={14} className="text-warm-blue" />
        <span className="font-code-medium">{value}</span>
      </div>
    )
  },
  { 
    key: 'category', 
    header: 'Category', 
    sortable: true,
    width: '150px',
    render: (value: string) => (
      <TerminalBadge variant="info" size="sm">{value}</TerminalBadge>
    )
  },
  { 
    key: 'features', 
    header: 'Key Features', 
    sortable: false,
    width: '300px',
    render: (features: string[]) => (
      <div className="space-y-1">
        {features.slice(0, 3).map((feature, index) => (
          <div key={index} className="text-xs text-current-muted">
            • {feature}
          </div>
        ))}
      </div>
    )
  },
  { 
    key: 'variants', 
    header: 'Variants', 
    sortable: true,
    width: '120px',
    render: (variants: string[]) => (
      <div className="flex flex-wrap gap-1">
        {variants.slice(0, 2).map((variant, index) => (
          <TerminalBadge key={index} variant="default" size="sm">
            {variant}
          </TerminalBadge>
        ))}
        {variants.length > 2 && (
          <TerminalBadge variant="default" size="sm">
            +{variants.length - 2}
          </TerminalBadge>
        )}
      </div>
    )
  },
  { 
    key: 'status', 
    header: 'Status', 
    sortable: true,
    width: '100px',
    render: (status: string) => (
      <TerminalBadge 
        variant={status === 'Complete' ? 'success' : status === 'Beta' ? 'warning' : 'error'}
        size="sm"
      >
        {status}
      </TerminalBadge>
    )
  }
];

// FAQ and Tabs data moved from dashboard
const faqItems = [
  {
    id: 'usage',
    title: 'How do I use Terminal UI components?',
    content: (
      <div className="space-y-3">
        <p>Simply import the components you need and use them in your React application:</p>
        <pre className="bg-black p-3 rounded-editor text-warm-green text-xs overflow-x-auto">
{`import { TerminalButton, TerminalCard } from '@terminal-ui/react';

function MyApp() {
  return (
    <TerminalCard title="My Dashboard">
      <TerminalButton variant="success">Click me!</TerminalButton>
    </TerminalCard>
  );
}`}
        </pre>
      </div>
    )
  },
  {
    id: 'customization',
    title: 'Can I customize the terminal theme?',
    content: (
      <div className="space-y-2">
        <p>Yes! All components support custom styling through:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>CSS custom properties for colors</li>
          <li>Tailwind CSS classes via className prop</li>
          <li>Built-in variant system (success, error, warning)</li>
          <li>Size variants (sm, md, lg)</li>
        </ul>
      </div>
    )
  },
  {
    id: 'accessibility',
    title: 'Are the components accessible?',
    content: (
      <p>All Terminal UI components are built with accessibility in mind, including proper ARIA labels, keyboard navigation, screen reader support, and WCAG compliance.</p>
    )
  }
];

const documentationTabs = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    badge: 'New',
    content: (
      <div className="space-y-4">
        <h4 className="font-terminal-ui font-code-medium text-current">Installation</h4>
        <pre className="bg-black p-3 rounded-editor text-warm-green text-xs">
          npm install @terminal-ui/react
        </pre>
        <p className="text-current-muted">Get started with Terminal UI components in your React application.</p>
      </div>
    )
  },
  {
    id: 'components',
    label: 'Components',
    badge: '15+',
    content: (
      <div className="space-y-4">
        <h4 className="font-terminal-ui font-code-medium text-current">Available Components</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <TerminalBadge variant="success" size="sm">Form</TerminalBadge>
            <span className="text-sm">Input, Select, Textarea</span>
          </div>
          <div className="flex items-center gap-2">
            <TerminalBadge variant="info" size="sm">Layout</TerminalBadge>
            <span className="text-sm">Card, Container, Navbar</span>
          </div>
          <div className="flex items-center gap-2">
            <TerminalBadge variant="warning" size="sm">Interactive</TerminalBadge>
            <span className="text-sm">Button, Modal, Toast</span>
          </div>
          <div className="flex items-center gap-2">
            <TerminalBadge variant="default" size="sm">Data</TerminalBadge>
            <span className="text-sm">Table, Tabs, Accordion</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'examples',
    label: 'Examples',
    content: (
      <div className="space-y-3">
        <h4 className="font-terminal-ui font-code-medium text-current">Example Applications</h4>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <TerminalBadge dot variant="success" />
            <span>Dashboard Analytics</span>
          </li>
          <li className="flex items-center gap-2">
            <TerminalBadge dot variant="info" />
            <span>Form Builder</span>
          </li>
          <li className="flex items-center gap-2">
            <TerminalBadge dot variant="warning" />
            <span>Admin Panel</span>
          </li>
        </ul>
      </div>
    )
  }
];

export default function ComponentsPage() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterCategory, setFilterCategory] = useState('All');
  
  const categories = ['All', 'Form', 'Interactive', 'Navigation', 'Layout', 'Display', 'Data'];
  
  // Filter data by category
  const filteredData = filterCategory === 'All' 
    ? componentsData 
    : componentsData.filter(component => component.category === filterCategory);

  // Calculate pagination
  const totalItems = filteredData.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when filter changes
  const handleCategoryChange = (category: string) => {
    setFilterCategory(category);
    setCurrentPage(1);
  };

  // Handle page size changes
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  return (
    <div className="px-6 py-12">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-terminal-ui font-code-semibold text-current mb-4">
          Terminal UI Components
        </h1>
        <p className="text-current-muted font-terminal-mono text-lg max-w-3xl mx-auto">
          Complete collection of terminal-inspired React components. 
          Authentic terminal aesthetics with modern usability and professional polish.
        </p>
        
        {/* Stats */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="text-center">
            <div className="text-2xl font-terminal-mono font-code-semibold text-warm-blue">
              {componentsData.length}
            </div>
            <div className="text-sm text-current-muted">Components</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-terminal-mono font-code-semibold text-gentle-success">
              {componentsData.filter(c => c.status === 'Complete').length}
            </div>
            <div className="text-sm text-current-muted">Complete</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-terminal-mono font-code-semibold text-warm-orange">
              {categories.length - 1}
            </div>
            <div className="text-sm text-current-muted">Categories</div>
          </div>
        </div>
      </div>

      {/* Components Table */}
      <TerminalContainer 
        title="Component Library - Terminal UI Toolkit"
        size="lg"
        className="mb-8"
      >
        {/* Filter Controls */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-terminal-ui font-code-medium text-current">
            Components Overview
          </h2>
          
          <div className="flex items-center gap-3">
            <Filter size={16} className="text-current-muted" />
            <div className="flex gap-2">
              {categories.map((category) => (
                <TerminalButton
                  key={category}
                  variant={filterCategory === category ? 'success' : 'ghost'}
                  size="sm"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </TerminalButton>
              ))}
            </div>
          </div>
        </div>

        {/* Table + Pagination */}
        <TerminalTable 
          data={currentPageData}
          columns={componentColumns}
          sortable={true}
          onRowClick={(component) => {
            console.log('Selected component:', component.name);
          }}
          className="mb-6"
        />

        <TerminalPagination 
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
          showInfo={true}
          showSizeChanger={true}
          pageSizeOptions={[5, 10, 15, 20]}
          maxVisiblePages={5}
          className="mt-4"
        />

        {/* Table Footer Info */}
        <div className="flex items-center justify-between pt-6 border-t border-current">
          <div className="flex items-center gap-2 text-sm text-current-muted font-terminal-mono">
            <Terminal size={14} />
            <span>
              {filterCategory === 'All' ? 'All Categories' : `${filterCategory} Components`}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <TerminalBadge variant="success" size="sm">
              {componentsData.filter(c => c.status === 'Complete').length} Complete
            </TerminalBadge>
          </div>
        </div>
      </TerminalContainer>

      {/* Documentation Tabs */}
      <TerminalContainer 
        title="Documentation & Examples"
        size="lg"
        className="mb-8"
      >
        <TerminalTabs
          items={documentationTabs}
          defaultTab="getting-started"
        />
      </TerminalContainer>

      {/* FAQ Accordion */}
      <TerminalContainer 
        title="Frequently Asked Questions"
        size="lg"
      >
        <TerminalAccordian
          items={faqItems}
          allowMultiple={true}
          defaultOpen={['usage']}
        />
      </TerminalContainer>
    </div>
  );
}
