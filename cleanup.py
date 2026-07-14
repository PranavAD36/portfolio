import os
import sys

os.chdir('.')
files = ['app/favicon.ico', 'app/icon.svg', 'public/favicon.ico']

for f in files:
    try:
        if os.path.exists(f):
            os.remove(f)
            print(f"✓ Deleted: {f}")
    except Exception as e:
        print(f"✗ Failed to delete {f}: {e}")

print("\nRemaining icon files:")
for f in os.listdir('app'):
    if 'icon' in f or 'favicon' in f:
        print(f"  app/{f}")
for f in os.listdir('public'):
    if 'icon' in f or 'favicon' in f:
        print(f"  public/{f}")
