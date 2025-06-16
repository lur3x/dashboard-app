import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

//TODO: move to separate int
interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  activeTab = signal('dashboard');
  
  navigationTabs = signal<any[]>([
    { id: 'dashboard', label: 'Dashboard', active: true, icon: 'home', route: 'dashboard' },
    { id: 'accounts', label: 'Accounts', icon: 'storage', route: 'account'  },
    { id: 'brokers', label: 'Brokers', icon: 'groups '  },
    { id: 'submissions', label: 'Submissions' , icon: 'content_paste_go' },
    { id: 'organizations', label: 'Organizations', icon: 'assignment '  },
    { id: 'goals', label: 'Goals & Rules', icon: 'track_changes'  },
    { id: 'admin', label: 'Admin', icon: 'vpn_key'  },
  ]);


  constructor(private router: Router){}

  selectTab(selectTab: any): void {
    this.activeTab.set(selectTab.id);
    
    // Update active state in tabs
    this.navigationTabs.update(tabs => 
      tabs.map(tab => ({
        ...tab,
        active: tab.id === selectTab.id
      }))
    );
console.log(selectTab)
    this.router.navigate([selectTab.route])
  }

  getTabClass(tab: any): string {
    return `nav-tab ${tab.active ? 'active' : ''}`;
  }

  scrollLeft(): void {
    const container = document.querySelector('.nav-tabs') as HTMLElement;
    if (container) {
      container.scrollLeft -= 200;
    }
  }

  scrollRight(): void {
    const container = document.querySelector('.nav-tabs') as HTMLElement;
    if (container) {
      container.scrollLeft += 200;
    }
  }

  canScrollLeft(): boolean {
    const container = document.querySelector('.nav-tabs') as HTMLElement;
    return container ? container.scrollLeft > 0 : false;
  }

  canScrollRight(): boolean {
    const container = document.querySelector('.nav-tabs') as HTMLElement;
    return container ? container.scrollLeft < (container.scrollWidth - container.clientWidth) : false;
  }
}