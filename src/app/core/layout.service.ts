import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { storage } from './storage';

/** Below this width the sidebar becomes an overlay drawer opened from the topbar. */
const MOBILE_QUERY = '(max-width: 959.98px)';
/** Phones: tables drop secondary columns. */
const PHONE_QUERY = '(max-width: 599.98px)';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly bp = inject(BreakpointObserver);

  /** Sidebar collapsed to the 72px icon rail. Remembered between visits. */
  readonly navCollapsed = signal(storage.get('ess.navCollapsed', false));
  readonly isMobile = toSignal(this.bp.observe(MOBILE_QUERY).pipe(map(s => s.matches)), { initialValue: this.bp.isMatched(MOBILE_QUERY) });
  readonly isPhone = toSignal(this.bp.observe(PHONE_QUERY).pipe(map(s => s.matches)), { initialValue: this.bp.isMatched(PHONE_QUERY) });
  /** Drawer state on phones and tablets. */
  readonly drawerOpen = signal(false);
  /** The icon rail only applies on desktop; the mobile drawer always shows labels. */
  readonly rail = computed(() => this.navCollapsed() && !this.isMobile());

  toggleNav(): void {
    if (this.isMobile()) {
      this.drawerOpen.set(false);
      return;
    }
    this.navCollapsed.update(v => !v);
    storage.set('ess.navCollapsed', this.navCollapsed());
  }
}
