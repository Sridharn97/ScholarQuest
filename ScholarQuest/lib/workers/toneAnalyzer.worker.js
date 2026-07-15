import { pipeline, env } from '@xenova/transformers';

// Skip local model check since we are downloading from Hugging Face
env.allowLocalModels = false;
env.useBrowserCache = true;

class ToneAnalyzerPipeline {
  static task = 'zero-shot-classification';
  static model = 'Xenova/mobilebert-uncased-mnli';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
  const { text, candidate_labels } = event.data;

  if (!text || text.trim().length === 0) {
    self.postMessage({ status: 'idle', result: null });
    return;
  }

  try {
    const analyzer = await ToneAnalyzerPipeline.getInstance(x => {
      self.postMessage({ status: 'loading', progress: x });
    });

    // Use provided labels or fall back to default tone labels
    const labels = candidate_labels || [
      'confident and professional',
      'hesitant or unsure',
      'informal and casual',
      'passionate and enthusiastic',
      'academic and objective'
    ];

    self.postMessage({ status: 'analyzing' });
    const output = await analyzer(text, labels, { multi_label: false });

    self.postMessage({
      status: 'complete',
      result: output
    });

  } catch (error) {
    self.postMessage({ status: 'error', error: error.message });
  }
});
