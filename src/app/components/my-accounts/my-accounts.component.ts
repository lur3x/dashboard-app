import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account } from '../../common/intefaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-my-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule],
  templateUrl: './my-accounts.component.html',
  styleUrl: './my-accounts.component.scss'
})
export class MyAccountsComponent implements OnInit {
  @Input() accounts: Account[] = [];
  @Output() accountSelected = new EventEmitter<Account>();

  searchTerm: string = '';
  filteredAccounts: Account[] = [];

  ngOnInit() {
    this.filteredAccounts = this.accounts;
    if (this.accounts.length === 0) {
      this.loadMockData();
    }
  }

  loadMockData() {
    this.accounts = [
      {
        id: '1',
        name: 'NAMEX Tech Solutions',
        type: 'Large Enterprise',
        line: 'D&O Liability',
        broker: 'Willis Towers',
        renewalDate: '04/16/2025',
        premium: '$2.3M',
        ratedPremium: '$2.8M',
        lossRatio: 32,
        appetite: 'HIGH',
        status: 'Active',
        triage: '180',
        winnability: 'Very Strong'
      },
      {
        id: '2',
        name: 'Alliance Healthcare Systems',
        type: 'Mid-Market',
        line: 'Medical Malpractice',
        broker: 'Aon Risk',
        renewalDate: '06/30/2025',
        premium: '$1.7M',
        ratedPremium: '$1.9M',
        lossRatio: 38,
        appetite: 'MEDIUM',
        status: 'Under review',
        triage: '165',
        winnability: 'Strong'
      },
      {
        id: '3',
        name: 'Maritime Logistics Corp',
        type: 'Shipping/Logistics',
        line: 'Marine Cargo',
        broker: 'Marsh McLennan',
        renewalDate: '09/05/2025',
        premium: '$875K',
        ratedPremium: '$920K',
        lossRatio: 25,
        appetite: 'HIGH',
        status: 'Active',
        triage: '182',
        winnability: 'Very Strong'
      },
      {
        id: '4',
        name: 'GreenField Energy Ltd',
        type: 'Energy Sector',
        line: 'Environmental Liability',
        broker: 'Aon Risk',
        renewalDate: '07/22/2025',
        premium: '$1.2M',
        ratedPremium: '$1.4M',
        lossRatio: 67,
        appetite: 'CAUTIOUS',
        status: 'Under review',
        triage: '158',
        winnability: 'Medium'
      }
    ];
    this.filteredAccounts = this.accounts;
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredAccounts = this.accounts;
      return;
    }

    this.filteredAccounts = this.accounts.filter(account =>
      account.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      account.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      account.broker.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onFilter() {
    console.log('Filter clicked');
  }

  onSort() {
    console.log('Sort clicked');
  }

  onGroup() {
    console.log('Group clicked');
  }

  onNew() {
    console.log('New account clicked');
  }

  onAccountInfo(account: Account) {
    console.log('Account info clicked:', account);
  }

  getLossRatioClass(lossRatio: number): string {
    if (lossRatio <= 35) return 'green';
    if (lossRatio <= 50) return 'yellow';
    return 'red';
  }

  getAppetiteClass(appetite: string): string {
    return appetite.toLowerCase();
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(' ', '-');
  }

  getWinnabilityDots(winnability: string): { class: string }[] {
    const dots = [
      { class: 'filled' },
      { class: 'filled' },
      { class: 'filled' },
      { class: 'filled' },
      { class: '' }
    ];

    switch (winnability) {
      case 'Very Strong':
        return dots.map((dot, index) => ({ class: index < 5 ? 'filled' : '' }));
      case 'Strong':
        return dots.map((dot, index) => ({ class: index < 4 ? 'filled' : '' }));
      case 'Medium':
        return dots.map((dot, index) => ({ class: index < 3 ? 'filled' : '' }));
      default:
        return dots.map((dot, index) => ({ class: index < 2 ? 'filled' : '' }));
    }
  }
}
