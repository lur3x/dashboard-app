import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { QuickAction } from '../../common/intefaces';


@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule
  ],
  templateUrl: './quick-actions.component.html',
  styleUrl: './quick-actions.component.scss'
})
export class QuickActionsComponent implements OnInit {
  private quickActionsData = signal<QuickAction[]>([]);
  
  quickActions = computed(() => this.quickActionsData());
  
  private mockActionsData: QuickAction[] = [
    {
      id: 'new-submission',
      label: 'New Submission',
      icon: 'add_circle_outline'
    },
    {
      id: 'quote-builder',
      label: 'Quote Builder',
      icon: 'build'
    },
    {
      id: 'risks-models',
      label: 'Risks Models',
      icon: 'assessment'
    },
    {
      id: 'documents-upload',
      label: 'Documents Upload',
      icon: 'cloud_upload'
    }
  ];

  ngOnInit() {
    this.loadQuickActions();
  }

  private async loadQuickActions() {
    await this.delay(300);
    this.quickActionsData.set([...this.mockActionsData]);
  }

  onActionClick(action: QuickAction) {
    if (action.disabled) return;
    
    console.log(`Action clicked: ${action.label}`);
    
    this.showActionFeedback(action);
    
    switch (action.id) {
      case 'new-submission':
        break;
      case 'quote-builder':
        break;
      case 'risks-models':
        break;
      case 'documents-upload':
        break;
    }
  }

  private showActionFeedback(action: QuickAction) {
    const updatedActions = this.quickActionsData().map(a => 
      a.id === action.id ? { ...a, disabled: true } : a
    );
    this.quickActionsData.set(updatedActions);
    
    setTimeout(() => {
      const reenabledActions = this.quickActionsData().map(a => 
        a.id === action.id ? { ...a, disabled: false } : a
      );
      this.quickActionsData.set(reenabledActions);
    }, 500);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
