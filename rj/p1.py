import schedule
import time
from datetime import datetime

class SocialScheduler:
    def __init__(self):
        self.queue = []
    
    def add_post(self, platform, content, scheduled_time):
        post = {
            'id': len(self.queue) + 1,
            'platform': platform,
            'content': content,
            'scheduled': scheduled_time,
            'status': 'queued'
        }
        self.queue.append(post)
        print(f"✓ Post scheduled for {platform} at {scheduled_time}")
        return post
    
    def post_to_platform(self, post):
        # Simulates API call
        print(f"\n📱 POSTING to {post['platform']}")
        print(f"   Content: {post['content'][:50]}...")
        print(f"   Time: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
        post['status'] = 'published'
    
    def bulk_schedule(self, posts_data):
        for post in posts_data:
            self.add_post(post['platform'], post['content'], post['time'])
    
    def show_queue(self):
        print("\n📋 SCHEDULED POSTS:")
        for post in self.queue:
            print(f"  [{post['status']}] {post['platform']}: {post['scheduled']}")

# Demo
scheduler = SocialScheduler()

# Bulk upload
posts = [
    {'platform': 'Twitter', 'content': 'Check out our new blog post!', 'time': '2024-03-15 09:00'},
    {'platform': 'Instagram', 'content': 'New product launch! 🚀', 'time': '2024-03-15 12:00'},
    {'platform': 'LinkedIn', 'content': 'Industry insights from our team', 'time': '2024-03-15 15:00'}
]

scheduler.bulk_schedule(posts)
scheduler.show_queue()

# Simulate posting
print("\n--- Simulating scheduled post execution ---")
scheduler.post_to_platform(scheduler.queue[0])