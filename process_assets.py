import os
import subprocess
import glob
from pathlib import Path
try:
    import static_ffmpeg
    static_ffmpeg.add_paths()
    print("Static FFmpeg paths added.")
except ImportError:
    print("static-ffmpeg not found, assuming ffmpeg is in system PATH.")

def process_videos(root_dir):
    # Find all mp4 files recursively
    video_files = glob.glob(os.path.join(root_dir, "**", "*.mp4"), recursive=True)
    
    if not video_files:
        print("No .mp4 files found in", root_dir)
        return

    print(f"Found {len(video_files)} videos to process...")

    for video_path in video_files:
        p = Path(video_path)
        output_path = p.with_suffix('.webm')
        
        print(f"Processing: {p.name} -> {output_path.name}")
        
        # User defined filter: colorkey=white:0.2:0.1
        # We need to ensure we encode to a format that supports alpha (VP9 or VP8 for WebM)
        # -c:v libvpx-vp9 -pix_fmt yuva420p is often good for transparency in webm
        # Using -auto-alt-ref 0 for better alpha handling in some cases, but defaults might work.
        
        cmd = [
            "ffmpeg",
            "-y", # Overwrite if exists
            "-i", str(p),
            "-vf", "colorkey=white:0.2:0.1,format=rgba", 
            "-c:v", "libvpx-vp9",
            "-b:v", "0", 
            "-crf", "30",
            "-pix_fmt", "yuva420p", # Essential for alpha
            str(output_path)
        ]
        
        try:
            # capture_output=True to avoid cluttering unless error
            result = subprocess.run(cmd, capture_output=True, text=True)
            if result.returncode == 0:
                print(f"  [OK] Saved to {output_path}")
            else:
                print(f"  [ERROR] Failed to process {p.name}")
                print(result.stderr)
        except Exception as e:
            print(f"  [EXCEPTION] {e}")

if __name__ == "__main__":
    # Assuming script is run from project root, target public/assets
    target_dir = os.path.join("public", "assets")
    if os.path.exists(target_dir):
        process_videos(target_dir)
    else:
        print(f"Directory not found: {target_dir}")
