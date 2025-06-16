export interface PortfolioGoal {
  id: string;
  label: string;
  target?: string;
  currentValue?: number;
  targetValue?: number;
  percentage: number;
  status: 'good' | 'warning' | 'danger' | 'on-target';
  segments?: { type: 'good' | 'warning' | 'danger'; width: number }[];
  statusText?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'accent';
}

export interface MarketIntelligenceItem {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  category: 'cyber' | 'capacity' | 'regulatory' | 'market';
  timestamp?: Date;
  isNew?: boolean;
}

export interface Account {
  id: string;
  name: string;
  type: string;
  line: string;
  broker: string;
  renewalDate: string;
  premium: string;
  ratedPremium: string;
  lossRatio: number;
  appetite: 'HIGH' | 'MEDIUM' | 'CAUTIOUS';
  status: 'Active' | 'Under review';
  triage: string;
  winnability: 'Very Strong' | 'Strong' | 'Medium';
}

export interface WorkItem {
  id: string;
  originator: {
    initials: string;
    name: string;
  };
  client: {
    name: string;
    line: string;
  };
  type: string;
  status: 'New' | 'Pending Review' | 'Completed';
  created: string;
}

export interface PoliciesItem {
  line: string;
  lineNumber: string;
  effDate: string;
  expDate: string;
  status: 'Active' | 'Pending' | 'Expired';
  expiringTech: string;
  expiringPremium: string;
  renewalToTech: string;
  renewalTech: string;
  renewalPremium: string;
  rateChange: string;
  lossRatio: string;
  icon: string;
  color: string;
}

export interface CommunicationItem {
  id: string;
  type: 'Policy Renewal' | 'New Quote Request' | 'Paid';
  title: string;
  description: string;
  date: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface AlertItem {
  title: string;
  description: string;
  date: string;
  actionText: string;
  type: 'warning' | 'success' | 'info';
}

export interface PolicyItem {
  name: string;
  premium: string;
  effectiveDate: string;
  icon: string;
  color: string;
}

export interface AccountStep {
  name: string;
  completed: boolean;
}

export interface ComplianceItem {
  name: string;
  completed: boolean;
}

export interface PolicyRowItem {
  id: string;
  line: string;
  effDate: string;
  expDate: string;
  status: 'Active' | 'Pending';
  expiringTech: string;
  expiringPremium: string;
  renewalToTech: string;
  renewalTech: string;
  renewalPremium: string;
  rateChange: string;
  lossRatio: string;
  statusColor: string;
  lossRatioColor: string;
}