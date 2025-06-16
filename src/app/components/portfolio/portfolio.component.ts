import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioGoal } from '../../common/intefaces';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {
  private portfolioGoalsData = signal<PortfolioGoal[]>([]);
  
  portfolioGoals = computed(() => this.portfolioGoalsData());
  
  private mockApiData: PortfolioGoal[] = [
    {
      id: 'loss-ratio',
      label: 'PORTFOLIO LOSS RATIO TARGET',
      target: 'Q2-85%',
      percentage: 48.2,
      status: 'good',
      statusText: '-6.8% (Good)',
      segments: [
        { type: 'good', width: 48.2 },
        { type: 'warning', width: 36.8 },
        { type: 'danger', width: 15 }
      ]
    },
    {
      id: 'renewal-retention',
      label: 'RENEWAL RETENTION',
      target: 'TG 85-90%',
      percentage: 88,
      status: 'on-target',
      statusText: '88% ON TARGET',
      segments: [
        { type: 'danger', width: 15 },
        { type: 'warning', width: 73 },
        { type: 'good', width: 12 }
      ]
    },
    {
      id: 'new-business',
      label: 'NEW BUSINESS TARGET',
      currentValue: 8.1,
      targetValue: 12,
      percentage: 67,
      status: 'warning'
    },
    {
      id: 'annual-gwp',
      label: 'ANNUAL GWP TARGET',
      currentValue: 28.4,
      targetValue: 42,
      percentage: 68,
      status: 'warning'
    }
  ];

  ngOnInit() {
    this.loadPortfolioData();
    
    setInterval(() => {
      this.updatePortfolioData();
    }, 30000);
  }

  private async loadPortfolioData() {
    await this.delay(500);
    this.portfolioGoalsData.set([...this.mockApiData]);
  }

  private async updatePortfolioData() {
    const updatedData = this.mockApiData.map(goal => ({
      ...goal,
      percentage: this.getRandomVariation(goal.percentage, 2),
      currentValue: goal.currentValue ? this.getRandomVariation(goal.currentValue, 0.5) : undefined,
      statusText: goal.id === 'loss-ratio' ? 
        `${this.getRandomVariation(-6.8, 1).toFixed(1)}% (${goal.status === 'good' ? 'Good' : 'Warning'})` : 
        goal.statusText
    }));
    
    this.portfolioGoalsData.set(updatedData);
  }

  private getRandomVariation(baseValue: number, maxVariation: number): number {
    const variation = (Math.random() - 0.5) * 2 * maxVariation;
    return Math.max(0, Math.min(100, baseValue + variation));
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  formatCurrency(value: number): string {
    if (value >= 1) {
      return `${value.toFixed(1)}M`;
    }
    return `${(value * 1000).toFixed(0)}K`;
  }
}
