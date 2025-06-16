import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-work-queue',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './work-queue.component.html',
  styleUrl: './work-queue.component.scss'
})
export class WorkQueueComponent {
  activeTab = signal('Assigned to me');
  
  tabs = signal([
    { label: 'Assigned to me', filter: 'assigned' },
    { label: 'Pending Review', filter: 'pending' },
    { label: 'Referrals', filter: 'referrals' }
  ]);

  workItems = signal<any[]>([
    {
      id: 'WQ-001',
      originator: 'Sam Masters',
      type: 'Underwriter Referral',
      client: 'Acme Corp',
      lineOfBusiness: 'Property & Casualty',
      priority: 'High',
      status: 'New',
      createdAt: '2025-06-15',
      assignedTo: 'current-user'
    },
    {
      id: 'WQ-002',
      originator: 'Sarah Johnson',
      type: 'Claims Review',
      client: 'Tech Solutions Ltd',
      lineOfBusiness: 'Cyber Security',
      priority: 'Medium',
      status: 'In Progress',
      createdAt: '2025-06-16',
      assignedTo: 'current-user'
    },
    {
      id: 'WQ-003',
      originator: 'Mike Davis',
      type: 'Underwriter Referral',
      client: 'Global Industries',
      lineOfBusiness: 'Manufacturing',
      priority: 'High',
      status: 'Pending',
      createdAt: '2025-06-14',
      assignedTo: 'current-user'
    },
    {
      id: 'WQ-004',
      originator: 'Lisa Chen',
      type: 'Policy Review',
      client: 'StartUp Inc',
      lineOfBusiness: 'Technology E&O',
      priority: 'Low',
      status: 'Completed',
      createdAt: '2025-06-13',
      assignedTo: 'other-user'
    },
    {
      id: 'WQ-005',
      originator: 'John Wilson',
      type: 'Underwriter Referral',
      client: 'Healthcare Partners',
      lineOfBusiness: 'Professional Liability',
      priority: 'High',
      status: 'Pending',
      createdAt: '2025-06-12',
      assignedTo: 'current-user'
    },
    {
      id: 'WQ-006',
      originator: 'Emma Thompson',
      type: 'Claims Investigation',
      client: 'Retail Chain Co',
      lineOfBusiness: 'General Liability',
      priority: 'Medium',
      status: 'In Progress',
      createdAt: '2025-06-11',
      assignedTo: 'other-user'
    },
    {
      id: 'WQ-007',
      originator: 'David Brown',
      type: 'Underwriter Referral',
      client: 'Construction Ltd',
      lineOfBusiness: 'Workers Compensation',
      priority: 'High',
      status: 'New',
      createdAt: '2025-06-10',
      assignedTo: 'current-user'
    },
    {
      id: 'WQ-008',
      originator: 'Rachel Green',
      type: 'Policy Amendment',
      client: 'Financial Services Inc',
      lineOfBusiness: 'Directors & Officers',
      priority: 'Low',
      status: 'Pending',
      createdAt: '2025-06-09',
      assignedTo: 'current-user'
    },
    {
      id: 'WQ-009',
      originator: 'Tom Anderson',
      type: 'Risk Assessment',
      client: 'Energy Corp',
      lineOfBusiness: 'Environmental',
      priority: 'Medium',
      status: 'In Progress',
      createdAt: '2025-06-08',
      assignedTo: 'other-user'
    },
  ]);

  filteredItems = computed(() => {
    const items = this.workItems();
    const tab = this.activeTab();
    
    switch (tab) {
      case 'Assigned to me':
        return items.filter(item => item.assignedTo === 'current-user');
      case 'Pending Review':
        return items.filter(item => item.status === 'Pending');
      case 'Referrals':
        return items.filter(item => item.type.includes('Referral'));
      default:
        return items;
    }
  });

  getTabCount(tabLabel: string): number {
    const items = this.workItems();
    
    switch (tabLabel) {
      case 'Assigned to me':
        return items.filter(item => item.assignedTo === 'current-user').length;
      case 'Pending Review':
        return items.filter(item => item.status === 'Pending').length;
      case 'Referrals':
        return items.filter(item => item.type.includes('Referral')).length;
      default:
        return 0;
    }
  }

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority.toLowerCase()}`;
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase().replace(' ', '-')}`;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  statusColor(status: string): string {
    switch (status) {
      case 'New':
        return 'new';
      case 'Pending':
        return 'pending';
      case 'In Progress':
        return 'in-progress';
      case 'Completed':
        return 'completed';
      default:
        return 'pending';
    }
  }

  onActionClick(item: any, event: Event) {
    event.stopPropagation();
    console.log('Action clicked for item:', item.id);
  }
}