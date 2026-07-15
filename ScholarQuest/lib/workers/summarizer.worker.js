import { pipeline, env } from '@xenova/transformers';

env.allowLocalModels = false;
env.useBrowserCache = true;

class SummarizerPipeline {
  static task = 'summarization';
  static model = 'Xenova/distilbart-cnn-6-6';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

self.addEventListener('message', async (event) => {
  const { text } = event.data;

  if (!text || text.trim().length === 0) {
    self.postMessage({ status: 'idle', result: null });
    return;
  }

  try {
    const summarizer = await SummarizerPipeline.getInstance(x => {
      self.postMessage({ status: 'loading', progress: x });
    });

    self.postMessage({ status: 'analyzing' });
    
    // Distilbart-cnn-6-6 works well for generating short summaries
    const output = await summarizer(text, {
      max_new_tokens: 60,
      min_length: 20,
    });

    self.postMessage({
      status: 'complete',
      result: output[0].summary_text
    });

  } catch (error) {
    self.postMessage({ status: 'error', error: error.message });
  }
});
