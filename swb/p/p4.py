import requests
from bs4 import BeautifulSoup

def audit_website(url):
    print(f"🔍 Auditing: {url}\n")
    
    try:
        r = requests.get(url, timeout=10)
        soup = BeautifulSoup(r.content, 'html.parser')
        
        # Check basics
        title = soup.find('title')
        meta_desc = soup.find('meta', {'name': 'description'})
        images = soup.find_all('img')
        h1_tags = soup.find_all('h1')
        
        print("✓ TITLE TAG:", title.text if title else "❌ MISSING")
        print("✓ META DESC:", meta_desc.get('content')[:50] if meta_desc else "❌ MISSING")
        print(f"✓ IMAGES: {len(images)} found")
        
        # Check image alt tags
        no_alt = [img for img in images if not img.get('alt')]
        print(f"⚠ IMAGES WITHOUT ALT: {len(no_alt)}")
        
        print(f"✓ H1 TAGS: {len(h1_tags)}")
        
        print("\n📊 RECOMMENDATIONS:")
        if not title: print("- Add page title")
        if not meta_desc: print("- Add meta description")
        if len(no_alt) > 0: print(f"- Add alt text to {len(no_alt)} images")
        if len(h1_tags) != 1: print("- Use exactly 1 H1 tag per page")
        
    except Exception as e:
        print(f"Error: {e}")

# Test with any website
audit_website("https://www.wix.com")