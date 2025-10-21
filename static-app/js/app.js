// 代码片段管理器
class SnippetManager {
    constructor() {
        // 初始化数据
        this.snippets = this.loadFromStorage();
        this.currentFilter = {
            language: 'all',
            tags: new Set(),
            search: ''
        };
        this.editingId = null;

        // 获取DOM元素
        this.snippetsList = document.getElementById('snippetsList');
        this.emptyState = document.getElementById('emptyState');
        this.newSnippetBtn = document.getElementById('newSnippetBtn');
        this.searchInput = document.getElementById('searchInput');
        this.snippetCount = document.getElementById('snippetCount');
        this.languageFilters = document.getElementById('languageFilters');
        this.tagFilters = document.getElementById('tagFilters');
        this.resetFiltersBtn = document.getElementById('resetFilters');

        // 模态框
        this.modal = new bootstrap.Modal(document.getElementById('snippetModal'));
        this.modalElement = document.getElementById('snippetModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.snippetForm = document.getElementById('snippetForm');
        this.saveSnippetBtn = document.getElementById('saveSnippetBtn');

        // 绑定事件
        this.bindEvents();

        // 如果没有数据，添加示例数据
        if (this.snippets.length === 0) {
            this.addSampleData();
        }

        // 渲染页面
        this.renderTagFilters();
        this.render();
    }

    // 绑定事件处理器
    bindEvents() {
        // 新建片段按钮
        this.newSnippetBtn.addEventListener('click', () => this.openNewSnippetModal());

        // 保存按钮
        this.saveSnippetBtn.addEventListener('click', () => this.saveSnippet());

        // 搜索
        this.searchInput.addEventListener('input', (e) => {
            this.currentFilter.search = e.target.value.toLowerCase();
            this.render();
        });

        // 语言筛选
        this.languageFilters.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-tag')) {
                const lang = e.target.dataset.lang;
                this.setLanguageFilter(lang);
            }
        });

        // 重置筛选器
        this.resetFiltersBtn.addEventListener('click', () => this.resetFilters());

        // 模态框关闭时重置表单
        this.modalElement.addEventListener('hidden.bs.modal', () => {
            this.snippetForm.reset();
            this.editingId = null;
        });
    }

    // 打开新建片段模态框
    openNewSnippetModal() {
        this.modalTitle.textContent = '新建代码片段';
        this.editingId = null;
        this.snippetForm.reset();
        this.modal.show();
    }

    // 打开编辑片段模态框
    openEditSnippetModal(id) {
        const snippet = this.snippets.find(s => s.id === id);
        if (!snippet) return;

        this.modalTitle.textContent = '编辑代码片段';
        this.editingId = id;

        document.getElementById('snippetTitle').value = snippet.title;
        document.getElementById('snippetDescription').value = snippet.description;
        document.getElementById('snippetLanguage').value = snippet.language;
        document.getElementById('snippetCode').value = snippet.code;
        document.getElementById('snippetTags').value = snippet.tags.join(', ');

        this.modal.show();
    }

    // 保存片段
    saveSnippet() {
        const title = document.getElementById('snippetTitle').value.trim();
        const description = document.getElementById('snippetDescription').value.trim();
        const language = document.getElementById('snippetLanguage').value;
        const code = document.getElementById('snippetCode').value.trim();
        const tagsInput = document.getElementById('snippetTags').value.trim();
        const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : [];

        if (!title || !code) {
            this.showToast('请填写必填字段', 'warning');
            return;
        }

        if (this.editingId) {
            // 编辑现有片段
            const snippet = this.snippets.find(s => s.id === this.editingId);
            if (snippet) {
                snippet.title = title;
                snippet.description = description;
                snippet.language = language;
                snippet.code = code;
                snippet.tags = tags;
                snippet.updatedAt = new Date().toISOString();
            }
            this.showToast('代码片段已更新', 'success');
        } else {
            // 新建片段
            const newSnippet = {
                id: Date.now(),
                title,
                description,
                language,
                code,
                tags,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            this.snippets.unshift(newSnippet);
            this.showToast('代码片段已创建', 'success');
        }

        this.saveToStorage();
        this.renderTagFilters();
        this.render();
        this.modal.hide();
    }

    // 删除片段
    deleteSnippet(id) {
        const snippet = this.snippets.find(s => s.id === id);
        if (!snippet) return;

        if (confirm(`确定要删除"${snippet.title}"吗？`)) {
            this.snippets = this.snippets.filter(s => s.id !== id);
            this.saveToStorage();
            this.renderTagFilters();
            this.render();
            this.showToast('代码片段已删除', 'info');
        }
    }

    // 复制代码
    async copyCode(code, btnElement) {
        try {
            await navigator.clipboard.writeText(code);
            const originalText = btnElement.innerHTML;
            btnElement.innerHTML = '<i class="fas fa-check"></i> 已复制';
            btnElement.classList.add('copied');

            setTimeout(() => {
                btnElement.innerHTML = originalText;
                btnElement.classList.remove('copied');
            }, 2000);

            this.showToast('代码已复制到剪贴板', 'success');
        } catch (err) {
            this.showToast('复制失败，请手动复制', 'danger');
        }
    }

    // 设置语言筛选
    setLanguageFilter(lang) {
        this.currentFilter.language = lang;

        // 更新按钮状态
        this.languageFilters.querySelectorAll('.filter-tag').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });

        this.render();
    }

    // 切换标签筛选
    toggleTagFilter(tag) {
        if (this.currentFilter.tags.has(tag)) {
            this.currentFilter.tags.delete(tag);
        } else {
            this.currentFilter.tags.add(tag);
        }

        // 更新按钮状态
        this.tagFilters.querySelectorAll('.filter-tag').forEach(btn => {
            if (btn.dataset.tag === tag) {
                btn.classList.toggle('active', this.currentFilter.tags.has(tag));
            }
        });

        this.render();
    }

    // 重置筛选器
    resetFilters() {
        this.currentFilter = {
            language: 'all',
            tags: new Set(),
            search: ''
        };
        this.searchInput.value = '';

        // 重置语言筛选按钮
        this.languageFilters.querySelectorAll('.filter-tag').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === 'all') {
                btn.classList.add('active');
            }
        });

        // 重置标签筛选按钮
        this.tagFilters.querySelectorAll('.filter-tag').forEach(btn => {
            btn.classList.remove('active');
        });

        this.render();
    }

    // 获取所有唯一标签
    getAllTags() {
        const tagsSet = new Set();
        this.snippets.forEach(snippet => {
            snippet.tags.forEach(tag => tagsSet.add(tag));
        });
        return Array.from(tagsSet).sort();
    }

    // 渲染标签筛选器
    renderTagFilters() {
        const allTags = this.getAllTags();
        this.tagFilters.innerHTML = allTags.map(tag => `
            <button class="filter-tag" data-tag="${this.escapeHtml(tag)}">
                ${this.escapeHtml(tag)}
            </button>
        `).join('');

        // 绑定标签点击事件
        this.tagFilters.querySelectorAll('.filter-tag').forEach(btn => {
            btn.addEventListener('click', () => {
                this.toggleTagFilter(btn.dataset.tag);
            });
        });
    }

    // 获取筛选后的片段
    getFilteredSnippets() {
        return this.snippets.filter(snippet => {
            // 语言筛选
            if (this.currentFilter.language !== 'all' && snippet.language !== this.currentFilter.language) {
                return false;
            }

            // 标签筛选
            if (this.currentFilter.tags.size > 0) {
                const hasMatchingTag = snippet.tags.some(tag => this.currentFilter.tags.has(tag));
                if (!hasMatchingTag) return false;
            }

            // 搜索筛选
            if (this.currentFilter.search) {
                const searchLower = this.currentFilter.search;
                const inTitle = snippet.title.toLowerCase().includes(searchLower);
                const inDescription = snippet.description.toLowerCase().includes(searchLower);
                const inCode = snippet.code.toLowerCase().includes(searchLower);
                const inTags = snippet.tags.some(tag => tag.toLowerCase().includes(searchLower));

                if (!inTitle && !inDescription && !inCode && !inTags) {
                    return false;
                }
            }

            return true;
        });
    }

    // 渲染片段列表
    render() {
        const filteredSnippets = this.getFilteredSnippets();

        // 更新计数
        this.snippetCount.textContent = filteredSnippets.length;

        if (filteredSnippets.length === 0) {
            this.snippetsList.classList.add('d-none');
            this.emptyState.classList.remove('d-none');
        } else {
            this.snippetsList.classList.remove('d-none');
            this.emptyState.classList.add('d-none');

            this.snippetsList.innerHTML = filteredSnippets.map(snippet =>
                this.createSnippetCard(snippet)
            ).join('');

            // 应用代码高亮
            Prism.highlightAll();

            // 绑定事件
            this.bindSnippetEvents();
        }
    }

    // 创建片段卡片HTML
    createSnippetCard(snippet) {
        const languageClass = this.getLanguageClass(snippet.language);

        return `
            <div class="col-12">
                <div class="snippet-card" data-id="${snippet.id}">
                    <div class="snippet-header">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h3 class="snippet-title">${this.escapeHtml(snippet.title)}</h3>
                                ${snippet.description ? `<p class="snippet-description">${this.escapeHtml(snippet.description)}</p>` : ''}
                            </div>
                            <span class="language-badge lang-${snippet.language}">
                                ${snippet.language}
                            </span>
                        </div>
                    </div>

                    <div class="snippet-code-wrapper">
                        <button class="copy-code-btn" data-code="${this.escapeHtml(snippet.code)}">
                            <i class="fas fa-copy"></i> 复制
                        </button>
                        <pre><code class="language-${languageClass}">${this.escapeHtml(snippet.code)}</code></pre>
                    </div>

                    <div class="snippet-footer">
                        <div class="snippet-tags">
                            ${snippet.tags.map(tag => `
                                <span class="tag-badge">${this.escapeHtml(tag)}</span>
                            `).join('')}
                        </div>
                        <div class="snippet-actions">
                            <button class="btn btn-sm btn-outline-primary edit-snippet-btn" data-id="${snippet.id}">
                                <i class="fas fa-edit"></i> 编辑
                            </button>
                            <button class="btn btn-sm btn-outline-danger delete-snippet-btn" data-id="${snippet.id}">
                                <i class="fas fa-trash"></i> 删除
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 获取Prism.js语言类
    getLanguageClass(language) {
        const languageMap = {
            'javascript': 'javascript',
            'typescript': 'typescript',
            'python': 'python',
            'css': 'css',
            'html': 'markup',
            'nginx': 'nginx',
            'bash': 'bash',
            'json': 'json'
        };
        return languageMap[language] || 'javascript';
    }

    // 绑定片段卡片事件
    bindSnippetEvents() {
        // 复制按钮
        document.querySelectorAll('.copy-code-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const code = e.currentTarget.dataset.code;
                this.copyCode(code, e.currentTarget);
            });
        });

        // 编辑按钮
        document.querySelectorAll('.edit-snippet-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                this.openEditSnippetModal(id);
            });
        });

        // 删除按钮
        document.querySelectorAll('.delete-snippet-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                this.deleteSnippet(id);
            });
        });
    }

    // 保存到本地存储
    saveToStorage() {
        try {
            localStorage.setItem('codeSnippets', JSON.stringify(this.snippets));
        } catch (e) {
            console.error('保存到本地存储失败:', e);
            this.showToast('保存失败，请检查浏览器存储设置', 'danger');
        }
    }

    // 从本地存储加载
    loadFromStorage() {
        try {
            const data = localStorage.getItem('codeSnippets');
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('从本地存储加载失败:', e);
            return [];
        }
    }

    // 显示提示消息
    showToast(message, type = 'info') {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';

        const alertClass = `alert-${type}`;
        toastContainer.innerHTML = `
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;

        document.body.appendChild(toastContainer);

        setTimeout(() => {
            toastContainer.remove();
        }, 3000);
    }

    // HTML转义
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 添加示例数据
    addSampleData() {
        const sampleSnippets = [
            {
                id: Date.now() + 1,
                title: 'React useDebounce Hook',
                description: '自定义 Hook 用于防抖输入',
                language: 'typescript',
                code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
                tags: ['react', 'hooks', 'typescript'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: Date.now() + 2,
                title: 'Python 数据验证装饰器',
                description: '用于验证参数类型的装饰器',
                language: 'python',
                code: `def validate_types(**type_checks):
    """验证函数参数类型的装饰器"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for arg_name, expected_type in type_checks.items():
                if arg_name in kwargs:
                    value = kwargs[arg_name]
                    if not isinstance(value, expected_type):
                        raise TypeError(
                            f"{arg_name} must be {expected_type.__name__}"
                        )
            return func(*args, **kwargs)
        return wrapper
    return decorator`,
                tags: ['python', 'decorator', 'validation'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: Date.now() + 3,
                title: 'CSS 渐变按钮',
                description: '带有悬停效果的渐变按钮样式',
                language: 'css',
                code: `.gradient-button {
  position: relative;
  padding: 12px 32px;
  font-size: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gradient-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}`,
                tags: ['css', 'animation', 'button'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: Date.now() + 4,
                title: 'Nginx 反向代理配置',
                description: 'Node.js 应用的 Nginx 反向代理示例',
                language: 'nginx',
                code: `server {
  listen 80;
  server_name example.com www.example.com;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}`,
                tags: ['nginx', 'proxy', 'config'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];

        this.snippets = sampleSnippets;
        this.saveToStorage();
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    const app = new SnippetManager();
    window.snippetManager = app;

    console.log('代码片段管理器已启动！');
    console.log('当前片段数量:', app.snippets.length);
});
