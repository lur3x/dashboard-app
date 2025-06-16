import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertItem, PolicyItem, AccountStep, ComplianceItem, CommunicationItem, PoliciesItem } from '../../common/intefaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  searchTerm = signal('');

  alerts = signal<AlertItem[]>([
    {
      title: 'Marine Survey Required',
      description: 'Scheduled for 02/16/2025',
      actionText: 'Review details link',
      type: 'warning',
      date: ''
    },
    {
      title: 'Loss Control Complete',
      description: 'Last inspection: 02/15/2025',
      actionText: 'View report',
      type: 'success',
      date: ''
    },
    {
      title: 'Claims Review Required',
      description: 'Open claims: 1, $245,000 TTV',
      actionText: 'View claims',
      type: 'info',
      date: ''
    }
  ]);

  policies = signal<PolicyItem[]>([
    {
      name: 'Marine Cargo',
      premium: '$625,000',
      effectiveDate: '6/30/2026',
      icon: '🚢',
      color: '#3B82F6'
    },
    {
      name: 'General Liability',
      premium: '$175,000',
      effectiveDate: '6/30/2026',
      icon: '✅',
      color: '#10B981'
    },
    {
      name: 'Workers Comp',
      premium: '$75,000',
      effectiveDate: '—',
      icon: '👥',
      color: '#8B5CF6'
    },
    {
      name: 'Property',
      premium: '$64,629.83',
      effectiveDate: '—',
      icon: '🏢',
      color: '#F59E0B'
    },
    {
      name: 'Umbrella',
      premium: '$275,000',
      effectiveDate: '13/03/2026',
      icon: '☂️',
      color: '#EF4444'
    }
  ]);

      policiesItem = signal<PoliciesItem[]>([
    {
      line: 'Marine Cargo',
      lineNumber: '17030212',
      effDate: '6/30/2026',
      expDate: '6/30/2027',
      status: 'Active',
      expiringTech: '$587,500',
      expiringPremium: '$605,000',
      renewalToTech: '$610,000',
      renewalTech: '$620,000',
      renewalPremium: '$625,000',
      rateChange: '3.3%',
      lossRatio: '22%',
      icon: '🚢',
      color: '#3B82F6'
    },
    {
      line: 'General Liability',
      lineNumber: '4651092',
      effDate: '6/30/2026',
      expDate: '6/30/2027',
      status: 'Active',
      expiringTech: '$160,000',
      expiringPremium: '$165,000',
      renewalToTech: '$170,000',
      renewalTech: '$172,500',
      renewalPremium: '$175,000',
      rateChange: '6.1%',
      lossRatio: '55%',
      icon: '✅',
      color: '#10B981'
    },
    {
      line: 'Workers Comp',
      lineNumber: '8456789',
      effDate: 'Pending',
      expDate: 'Pending',
      status: 'Pending',
      expiringTech: '$0',
      expiringPremium: '$0',
      renewalToTech: '$75,500',
      renewalTech: '$75,000',
      renewalPremium: '$75,000',
      rateChange: 'N/A',
      lossRatio: 'N/A',
      icon: '👥',
      color: '#8B5CF6'
    },
    {
      line: 'Umbrella',
      lineNumber: '5276636',
      effDate: '13/03/2026',
      expDate: '13/03/2027',
      status: 'Active',
      expiringTech: '$245,000',
      expiringPremium: '$250,000',
      renewalToTech: '$267,500',
      renewalTech: '$270,000',
      renewalPremium: '$275,000',
      rateChange: '10.0%',
      lossRatio: '78%',
      icon: '☂️',
      color: '#EF4444'
    }
  ]);

  accountSteps = signal<AccountStep[]>([
    { name: 'Submitted', completed: true },
    { name: 'Review', completed: true },
    { name: 'Quote', completed: true },
    { name: 'Bind', completed: true },
    { name: 'Issue', completed: true },
    { name: 'Renew', completed: false }
  ]);

  complianceItems = signal<ComplianceItem[]>([
    { name: 'KYC verification', completed: true },
    { name: 'Required Documentation', completed: true },
    { name: 'Regulatory approval', completed: true },
    { name: 'Financial Verification', completed: true }
  ]);

  communicationItems = signal<CommunicationItem[]>([
    {
      id: '1',
      type: 'Policy Renewal',
      title: 'Policy Renewal - Auto Insurance 5/15/25',
      description: 'Hello Arthur, I\'m reaching out regarding the upcoming auto policy renewal for Real Estate Group, LLC. The current policy expires on 6/30/2024. Would you like to review coverage options before proceeding with the renewal?',
      date: 'Apr 5',
      priority: 'high'
    },
    {
      id: '2',
      type: 'New Quote Request',
      title: 'New Quote Request - Workers Comp Insurance',
      description: 'Hi Arthur, Real Estate Group has expressed interest in adding workers compensation coverage to their insurance portfolio. I\'ve completed the initial risk assessment based on their current operations.',
      date: 'Apr 5',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'Paid',
      title: 'Fwd: New Submission - BPM Real Estate - EFF 4/1/24',
      description: 'Arthur, attached please find our submission for the above mentioned applicant. We have reviewed the account and believe it would be a good fit for your portfolio.',
      date: 'Mar 25',
      priority: 'low'
    },
    {
      id: '4',
      type: 'New Quote Request',
      title: 'New Business: BPM Real Estate Group, LLC',
      description: 'Hello Arthur, I am pleased to present you with a submission on this client.&#39;s successful property management business. Please review the attached documents.',
      date: 'Feb 28',
      priority: 'medium'
    }
  ]);

  getPriorityClass(priority?: string): string {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  }

  getTypeClass(type: string): string {
    switch (type) {
      case 'Policy Renewal':
        return 'type-renewal';
      case 'New Quote Request':
        return 'type-quote';
      case 'Paid':
        return 'type-paid';
      default:
        return '';
    }
  }

    filteredPolicies = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.policiesItem();
    
    return this.policiesItem().filter(policy => 
      policy.line.toLowerCase().includes(term) ||
      policy.lineNumber.toLowerCase().includes(term) ||
      policy.status.toLowerCase().includes(term)
    );
  });

  totals = computed(() => {
    const policies = this.filteredPolicies();
    return {
      expiringTech: '$992,500',
      expiringPremium: '$1,020,000',
      renewalToTech: '$1,123,000',
      renewalTech: '$1,137,500',
      renewalPremium: '$1,150,000',
      rateChange: '6.9%',
      lossRatio: '58.3%'
    };
  });

  getRateChangeClass(rateChange: string): string {
    if (rateChange === 'N/A') return 'rate-neutral';
    const rate = parseFloat(rateChange);
    return rate > 0 ? 'rate-positive' : 'rate-negative';
  }

  getLossRatioClass(lossRatio: string): string {
    if (lossRatio === 'N/A') return 'loss-ratio-medium';
    const ratio = parseFloat(lossRatio);
    if (ratio < 40) return 'loss-ratio-low';
    if (ratio < 70) return 'loss-ratio-medium';
    return 'loss-ratio-high';
  }
}