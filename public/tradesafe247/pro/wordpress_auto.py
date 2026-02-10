import json
from datetime import datetime

class WordPressAutomation:
    def __init__(self):
        self.posts = []
        self.media = []
    
    def create_post(self, title, content):
        post = {
            "id": len(self.posts) + 1,
            "title": title,
            "content": content,
            "status": "draft",
            "date": datetime.now().isoformat()
        }
        self.posts.append(post)
        return post
    
    def bulk_upload_images(self, image_names):
        for name in image_names:
            media = {
                "id": len(self.media) + 1,
                "filename": name,
                "uploaded": datetime.now().isoformat()
            }
            self.media.append(media)
        return self.media
    
    def get_all_posts(self):
        return self.posts

# Demo
wp = WordPressAutomation()

# Create posts
print("Creating posts...")
wp.create_post("Welcome Post", "This is automated content")
wp.create_post("Product Update", "New features released")
wp.create_post("Company News", "Quarterly results")

# Upload images
print("\nUploading images...")
wp.bulk_upload_images(["hero.jpg", "logo.png", "banner.jpg"])

# Show results
print(f"\n✓ Created {len(wp.posts)} posts")
print(f"✓ Uploaded {len(wp.media)} images")
print("\nPosts created:")
for post in wp.get_all_posts():
    print(f"  - {post['title']} (ID: {post['id']})")

print("\n✓ WordPress automation prototype working!")