# Zap Studio

A local-first web application for generating children's story videos with AI. Create engaging video content by combining AI-generated stories, voiceovers, and illustrations.

## Features

- 📝 **AI Story Generation** - Generate children's stories with Claude AI
- 🎤 **Voice Narration** - Convert stories to natural speech with ElevenLabs
- 🖼️ **AI Illustrations** - Create beautiful scenes with DALL-E 3
- 🎬 **Video Assembly** - Automatically combine everything with FFmpeg
- ⚙️ **Provider Abstraction** - Easily switch between AI providers
- 🔒 **Local-First** - All data stored locally, full privacy control
- ✅ **Manual Review** - Approve or regenerate at each stage

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **FFmpeg** - Required for video assembly
  - Windows: Download from [ffmpeg.org](https://ffmpeg.org/download.html) or use `winget install ffmpeg`
  - Mac: `brew install ffmpeg`
  - Linux: `sudo apt install ffmpeg`

## Quick Start

### 1. Installation

```bash
npm install
```

### 2. Configure API Keys

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 and go to **Settings** to configure your API keys:

- **Claude (Anthropic)**: Get from [console.anthropic.com](https://console.anthropic.com/)
- **OpenAI**: Get from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **ElevenLabs**: Get from [elevenlabs.io](https://elevenlabs.io/)

### 3. Create Your First Project

1. Click **"New Project"** on the dashboard
2. Enter a project name and optional theme
3. Click into the project to start the pipeline

### 4. Generation Pipeline

The pipeline has 4 stages, each requiring your approval:

1. **📝 Story Generation** (~30 seconds)
   - Generate story content with AI
   - Review and edit the text
   - Approve to continue

2. **🎤 Voice Generation** (~1-2 minutes)
   - Convert story to audio narration
   - Listen to preview
   - Approve or regenerate with different voice

3. **🖼️ Image Generation** (~2-5 minutes)
   - Generate illustrations for each scene
   - Review all images
   - Regenerate individual scenes if needed
   - Approve to continue

4. **🎬 Video Assembly** (~30 seconds)
   - FFmpeg combines images and audio
   - Timing automatically calculated
   - Final video saved to project folder

## Generated Content Location

All project files are saved in: `data/files/projects/[projectId]/`

- `story.json` - Generated story content
- `audio.mp3` - Voice narration
- `images/` - Scene illustrations
- `video.mp4` - Final assembled video

## Configuration

All settings stored locally in SQLite (`data/database.db`).

### Default Settings (Edit via Settings page)
- **Target Age Group**: Default "5-10"
- **Word Count**: Default 200
- **Language**: Default "English"
- **Voice**: Default "Matilda"

### Provider Configuration

Currently supported:
- **Story**: Claude (easily add Gemini, GPT-4, etc.)
- **Image**: DALL-E 3 (easily add Midjourney, Stable Diffusion)
- **Voice**: ElevenLabs (easily add OpenAI TTS, Google TTS)

## Cost Estimates

Typical costs per video (using default providers):

- Story (Claude): ~$0.01-0.02
- Voice (ElevenLabs): ~$0.30 (2-minute narration)
- Images (DALL-E 3): ~$0.40 (10 scenes @ $0.04 each)
- **Total: ~$0.70-0.75 per video**

## Troubleshooting

### "FFmpeg not found"
Make sure FFmpeg is installed and available in your PATH.
Test with: `ffmpeg -version`

### "API key invalid"
Double-check your API keys in Settings. Make sure they're entered correctly without extra spaces.

### Database locked
If you see database errors, close all instances of the app and restart.

### Port 3000 already in use
Change the port: `PORT=3001 npm run dev`

## Architecture

- **Local-First**: Everything runs on your machine
- **Provider Abstraction**: Swap AI services without code changes
- **Manual Gates**: Review and approve each stage
- **Extensible**: Easy to add new features
- **SaaS-Ready**: Clean architecture for future productization

Built with Next.js, TypeScript, SQLite, and AI ✨
