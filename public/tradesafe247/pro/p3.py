# task_automator.py
import os
import re
from datetime import datetime

class AdminAutomation:
    
    def organize_downloads(self, folder):
        """Sort files by type"""
        for file in os.listdir(folder):
            ext = file.split('.')[-1]
            os.makedirs(f"{folder}/{ext}_files", exist_ok=True)
            os.rename(f"{folder}/{file}", 
                     f"{folder}/{ext}_files/{file}")
    
    def extract_emails(self, text_file):
        """Extract emails from logs"""
        with open(text_file) as f:
            emails = re.findall(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', 
                               f.read())
        return list(set(emails))
    
    def daily_backup_check(self, backup_dir):
        """Check if backup exists today"""
        today = datetime.now().strftime('%Y-%m-%d')
        backups = os.listdir(backup_dir)
        if any(today in b for b in backups):
            print(f"✓ Backup exists for {today}")
        else:
            print(f"⚠ No backup for {today}")

# Demo
auto = AdminAutomation()
auto.organize_downloads('C:/Users/WASBERRY/Downloads')
print("✓ Automation library ready")