import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { WorkQueueComponent } from '../work-queue/work-queue.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { QuickActionsComponent } from '../quick-actions/quick-actions.component';
import { MarketIntelligenceComponent } from '../market-intel/market-intel.component';
import { MyAccountsComponent } from '../my-accounts/my-accounts.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavigationComponent, WorkQueueComponent, PortfolioComponent, QuickActionsComponent, MarketIntelligenceComponent, MyAccountsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
