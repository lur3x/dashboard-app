import { Component, computed, OnInit, signal } from '@angular/core';
import { MarketIntelligenceItem } from '../../common/intefaces';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-market-intel',
  standalone: true,
imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatRippleModule
  ],
  templateUrl: './market-intel.component.html',
  styleUrl: './market-intel.component.scss'
})
export class MarketIntelligenceComponent implements OnInit {
  // Signal to hold market intelligence data
  private marketIntelligenceData = signal<MarketIntelligenceItem[]>([]);
  
  // Computed signal for reactive data access
  marketIntelligence = computed(() => this.marketIntelligenceData());
  
  // Mock data
  private mockIntelligenceData: MarketIntelligenceItem[] = [
    {
      id: 'cyber-hardening',
      title: 'Rate hardening in Cyber market',
      description: '+15% YoY',
      severity: 'high',
      category: 'cyber',
      timestamp: new Date(),
      isNew: false
    },
    {
      id: 'marine-capacity',
      title: 'New capacity entering Marine market',
      description: '+15% YoY',
      severity: 'medium',
      category: 'capacity',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isNew: true
    },
    {
      id: 'environmental-ca',
      title: 'Environmental regulatory changes in CA',
      description: '',
      severity: 'low',
      category: 'regulatory',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isNew: false
    }
  ];

  ngOnInit() {
    // Load initial data
    this.loadMarketIntelligence();
    
    // Simulate periodic updates
    setInterval(() => {
      this.updateIntelligenceData();
    }, 45000); // Update every 45 seconds
  }

  private async loadMarketIntelligence() {
    // Simulate network delay
    await this.delay(400);
    this.marketIntelligenceData.set([...this.mockIntelligenceData]);
  }

  private async updateIntelligenceData() {
    // Simulate new intelligence items being added
    const currentData = [...this.marketIntelligenceData()];
    
    // Randomly update existing items or add new ones
    if (Math.random() > 0.7) {
      // 30% chance to add a new item
      const newItem: MarketIntelligenceItem = {
        id: `item-${Date.now()}`,
        title: this.getRandomTitle(),
        description: this.getRandomDescription(),
        severity: this.getRandomSeverity(),
        category: this.getRandomCategory(),
        timestamp: new Date(),
        isNew: true
      };
      
      currentData.unshift(newItem);
      
      // Keep only the latest 5 items
      if (currentData.length > 5) {
        currentData.splice(5);
      }
    } else {
      // Update existing items (remove new badges from old items)
      const updatedData = currentData.map(item => ({
        ...item,
        isNew: item.timestamp && (Date.now() - item.timestamp.getTime()) < 300000 ? item.isNew : false
      }));
      
      this.marketIntelligenceData.set(updatedData);
      return;
    }
    
    this.marketIntelligenceData.set(currentData);
  }

  onItemClick(item: MarketIntelligenceItem) {
    console.log(`Intelligence item clicked: ${item.title}`);
    
    // Mark item as read (remove new badge)
    const updatedData = this.marketIntelligenceData().map(i => 
      i.id === item.id ? { ...i, isNew: false } : i
    );
    this.marketIntelligenceData.set(updatedData);
    
    // Here you would typically navigate to detailed view or show modal
  }

  private getRandomTitle(): string {
    const titles = [
      'New reinsurance capacity available',
      'Catastrophe bond market update',
      'Regulatory changes in Lloyd\'s market',
      'Emerging risk: Climate liability',
      'Technology E&O rate increases',
      'Casualty market consolidation'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private getRandomDescription(): string {
    const descriptions = [
      '+8% YoY', '+12% YoY', '-5% YoY', 'New regulations', 
      'Market expansion', 'Capacity reduction'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }

  private getRandomSeverity(): 'high' | 'medium' | 'low' {
    const severities: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];
    return severities[Math.floor(Math.random() * severities.length)];
  }

  private getRandomCategory(): 'cyber' | 'capacity' | 'regulatory' | 'market' {
    const categories: ('cyber' | 'capacity' | 'regulatory' | 'market')[] = 
      ['cyber', 'capacity', 'regulatory', 'market'];
    return categories[Math.floor(Math.random() * categories.length)];
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
