import random

class ContentVariationGenerator:
    def __init__(self):
        self.hooks = [
            "Did you know that",
            "Here's why",
            "Stop scrolling!",
            "The secret to",
            "You won't believe"
        ]
        self.ctas = [
            "Link in bio!",
            "Comment below!",
            "Share with a friend!",
            "Save this for later!",
            "Double tap if you agree!"
        ]
        self.emojis = {
            'excited': ['🚀', '✨', '💡', '🔥'],
            'professional': ['📊', '💼', '📈', '🎯'],
            'friendly': ['👋', '💙', '🌟', '😊']
        }
    
    def generate_variations(self, base_content, tone='professional', count=5):
        variations = []
        
        for i in range(count):
            hook = random.choice(self.hooks)
            cta = random.choice(self.ctas)
            emoji = random.choice(self.emojis[tone])
            
            # Generate variation
            variation = f"{hook} {base_content} {emoji}\n\n{cta}"
            variations.append({
                'version': i+1,
                'content': variation,
                'platform': self._suggest_platform(len(variation))
            })
        
        return variations
    
    def _suggest_platform(self, length):
        if length < 140: return 'Twitter'
        elif length < 300: return 'Instagram'
        else: return 'LinkedIn'
    
    def display_variations(self, variations):
        print("\n🎨 CONTENT VARIATIONS GENERATED\n")
        for v in variations:
            print(f"--- Version {v['version']} ({v['platform']}) ---")
            print(v['content'])
            print()

# Demo
generator = ContentVariationGenerator()

base = "Our new social media course teaches you proven strategies for growth"
variations = generator.generate_variations(base, tone='excited', count=5)
generator.display_variations(variations)