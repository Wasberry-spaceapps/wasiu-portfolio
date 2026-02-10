import time
import json
import csv
import random
import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta

# ==========================================
# PROJECT 1: Social Media Content Orchestrator
# ==========================================
class SocialOrchestrator:
    def __init__(self):
        print("--- PROJECT 1: Social Media Orchestrator Initialized ---")
    
    def generate_caption(self, topic, tone="professional"):
        # SIMULATION: In production, this calls OpenAI API
        print(f"[*] Querying AI for topic: {topic}...")
        time.sleep(1) # Simulating API latency
        
        templates = [
            f"🚀 Unlock the power of {topic}! Here is how to get started. #{tone} #growth",
            f"Are you struggling with {topic}? You are not alone. Let's dive in. 💡",
            f"The secret to {topic} is consistency. Read more below! 👇"
        ]
        return random.choice(templates)

    def schedule_post(self, platform, content, time_slot):
        # SIMULATION: In production, this calls Buffer/Hootsuite API
        payload = {
            "platform": platform,
            "content": content,
            "scheduled_at": time_slot,
            "status": "queued"
        }
        # Log to "database" (JSON file)
        with open("social_schedule.json", "a") as f:
            f.write(json.dumps(payload) + "\n")
        print(f"[+] Success: Post scheduled for {platform} at {time_slot}")

# ==========================================
# PROJECT 3: Wellness Niche Market Scanner
# ==========================================
class MarketScanner:
    def __init__(self):
        print("\n--- PROJECT 3: Wellness Market Scanner Initialized ---")

    def scan_trends(self):
        # We will scrape a safe, public blog (example: a tech blog) 
        # as a placeholder for a "Wellness" site to demonstrate the tech.
        url = "https://news.ycombinator.com/" 
        print(f"[*] Scraping {url} for trending keywords...")
        
        try:
            response = requests.get(url)
            soup = BeautifulSoup(response.text, 'html.parser')
            titles = soup.find_all('span', class_='titleline')
            
            trends = []
            for title in titles[:5]: # Get top 5
                trends.append(title.get_text())
                
            print(f"[+] Found {len(trends)} trending topics:")
            for t in trends:
                print(f"   - {t}")
            return trends
        except Exception as e:
            print(f"[!] Error scanning: {e}")
            return []

# ==========================================
# PROJECT 5: Data Generator for Xero Reporting
# ==========================================
def generate_xero_csv():
    print("\n--- PROJECT 5: Generating Dummy Xero Data ---")
    headers = ['Date', 'Description', 'Reference', 'Debit', 'Credit', 'Balance']
    
    with open('xero_export_dummy.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(headers)
        
        balance = 10000
        start_date = datetime.now()
        
        for i in range(30): # 30 days of data
            date = (start_date - timedelta(days=i)).strftime('%Y-%m-%d')
            if i % 2 == 0:
                desc = f"Client Payment {100+i}"
                credit = random.randint(500, 2000)
                debit = 0
            else:
                desc = f"Software Subscription {i}"
                credit = 0
                debit = random.randint(20, 100)
            
            balance = balance + credit - debit
            writer.writerow([date, desc, f"INV-{1000+i}", debit, credit, balance])
            
    print("[+] 'xero_export_dummy.csv' created. Upload this to Google Sheets.")

# ==========================================
# MAIN EXECUTION
# ==========================================
if __name__ == "__main__":
    # Run Project 1
    orchestrator = SocialOrchestrator()
    cap = orchestrator.generate_caption("Virtual Assistant Productivity", "energetic")
    orchestrator.schedule_post("LinkedIn", cap, "2023-10-27 10:00:00")
    
    # Run Project 3
    scanner = MarketScanner()
    scanner.scan_trends()
    
    # Run Project 5 Setup
    generate_xero_csv()