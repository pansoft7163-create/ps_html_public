const fs = require('fs');
const path = require('path');

/**
 * 解析 Markdown 表格格式的导航数据
 * @param {string} markdown - Markdown 内容
 * @returns {object} - 解析后的导航数据对象
 */
function parseMarkdown(markdown) {
    const categories = [];

    // 按一级标题分割内容
    const sections = markdown.split(/^# /m).filter(s => s.trim());

    sections.forEach(section => {
        const lines = section.trim().split('\n');
        if (lines.length === 0) return;

        // 解析标题和图标
        const titleLine = lines[0];
        const match = titleLine.match(/^(.+?)\s*([🔧🛠️⚛️📚🎨🌐💡🚀📊🎯🔥💻📱🎮🎵📝🗂️]+)\s*$/);

        const category = {
            name: match ? match[1].trim() : titleLine.trim(),
            icon: match ? match[2] : '📌',
            links: []
        };

        // 查找表格起始位置
        let tableStartIndex = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('|')) {
                tableStartIndex = i;
                break;
            }
        }

        if (tableStartIndex === -1) return;

        // 解析表格数据（跳过表头和分隔行）
        for (let i = tableStartIndex + 2; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line || !line.includes('|')) continue;

            const cells = line
                .split('|')
                .map(c => c.trim())
                .filter(c => c);

            if (cells.length >= 3) {
                category.links.push({
                    name: cells[0],
                    url: cells[1],
                    description: cells[2]
                });
            }
        }

        if (category.links.length > 0) {
            categories.push(category);
        }
    });

    return {
        title: '我的导航页面',
        categories: categories
    };
}

/**
 * 主函数：读取 MD 文件并转换为 JSON
 */
function main() {
    const mdPath = path.join(__dirname, 'navigation-data.md');
    const jsonPath = path.join(__dirname, 'navigation-data.json');

    try {
        console.log('📖 读取 Markdown 文件...');
        const markdown = fs.readFileSync(mdPath, 'utf-8');

        console.log('🔄 解析 Markdown 内容...');
        const data = parseMarkdown(markdown);

        console.log(`✅ 解析成功！找到 ${data.categories.length} 个分类`);
        data.categories.forEach(cat => {
            console.log(`   - ${cat.icon} ${cat.name}: ${cat.links.length} 个链接`);
        });

        console.log('💾 写入 JSON 文件...');
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');

        console.log('✨ 转换完成！navigation-data.json 已生成');

    } catch (error) {
        console.error('❌ 转换失败:', error.message);
        process.exit(1);
    }
}

// 执行转换
main();
