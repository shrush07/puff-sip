import { Injectable } from '@angular/core';
import { isBrowser } from '../utils/is-browser';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Set item
  setItem(key: string, value: string): void {
    if (isBrowser()) {
      window.localStorage.setItem(key, value);
    }
  }

  // Get item
  getItem(key: string): string | null {
    if (isBrowser()) {
      const value = window.localStorage.getItem(key);
      return value !== null ? value : null;
    }
    return null;
  }

  // Remove item
  removeItem(key: string): void {
    if (isBrowser()) {
      window.localStorage.removeItem(key);
    }
  }

  // Clear all items
  clear(): void {
    if (isBrowser()) {
      window.localStorage.clear();
    }
  }

  // Check if running in the browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
  }
}
