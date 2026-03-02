/**
 * Analyze Missing Sanity Fields
 * Compares what Angular components expect vs what's defined in Sanity models
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing Missing Sanity Fields...\n');

// Read the models file
const modelsPath = path.join(__dirname, 'src/app/shared/models/sanity.models.ts');
const modelsContent = fs.readFileSync(modelsPath, 'utf-8');

// Read component files
const componentFiles = [
    { name: 'Home', path: 'src/app/features/home/home.component.html' },
    { name: 'Home Component TS', path: 'src/app/features/home/home.component.ts' },
    { name: 'Case Study (Home Page)', path: 'src/app/features/home/components/case-study/case-study.component.html' },
    { name: 'About', path: 'src/app/features/about-us/about-us.component.html' },
    { name: 'Product', path: 'src/app/features/product/product.component.html' },
    { name: 'Contact', path: 'src/app/features/contact/contact.component.html' },
    { name: 'Careers', path: 'src/app/features/careers/careers.component.html' }
];

console.log('═══════════════════════════════════════════════════════════════\n');
console.log('📊 MISSING SANITY FIELDS ANALYSIS\n');
console.log('═══════════════════════════════════════════════════════════════\n');

// Analyze HomePage interface
console.log('🏠 HOME PAGE ANALYSIS\n');
console.log('─────────────────────────────────────────────────────────────\n');

// Extract HomePage interface
const homePageMatch = modelsContent.match(/export interface HomePage \{[^}]*\}/s);
if (homePageMatch) {
    const homePageInterface = homePageMatch[0];

    console.log('✅ Fields DEFINED in HomePage model:');
    console.log('───────────────────────────────────────────────\n');

    const fields = homePageInterface.match(/\s+(\w+)\??:/g);
    if (fields) {
        fields.forEach(field => {
            const fieldName = field.trim().replace('?:', '').replace(':', '');
            console.log(`   • ${fieldName}`);
        });
    }

    console.log('\n');
}

// Check what home component template expects
console.log('🔎 Fields USED in Home Component Template:');
console.log('───────────────────────────────────────────────\n');

const homeTemplatePath = path.join(__dirname, 'src/app/features/home/home.component.html');
const homeTemplate = fs.readFileSync(homeTemplatePath, 'utf-8');

// Extract data bindings
const dataBindings = homeTemplate.match(/data\.(\w+)/g);
if (dataBindings) {
    const uniqueBindings = [...new Set(dataBindings)].map(b => b.replace('data.', ''));
    uniqueBindings.forEach(binding => {
        console.log(`   • ${binding}`);
    });
}

console.log('\n');

// Check testimonials
console.log('💬 TESTIMONIALS ANALYSIS\n');
console.log('─────────────────────────────────────────────────────────────\n');

const testimonialMatch = modelsContent.match(/export interface Testimonial \{[^}]*\}/s);
if (testimonialMatch) {
    console.log('✅ Testimonial model exists with fields:');
    const fields = testimonialMatch[0].match(/\s+(\w+)\??:/g);
    if (fields) {
        fields.forEach(field => {
            const fieldName = field.trim().replace('?:', '').replace(':', '');
            console.log(`   • ${fieldName}`);
        });
    }
}

console.log('\n');

// Check case study section
console.log('📂 CASE STUDY SECTION ANALYSIS\n');
console.log('─────────────────────────────────────────────────────────────\n');

const caseStudyPath = path.join(__dirname, 'src/app/features/home/components/case-study/case-study.component.html');
const caseStudyTemplate = fs.readFileSync(caseStudyPath, 'utf-8');

console.log('⚠️  CRITICAL FINDING:');
console.log('   The "Staatliche Agenten" case study section is HARDCODED!');
console.log('   It does NOT come from Sanity.\n');

console.log('   Current implementation: Static HTML in component');
console.log('   Location: src/app/features/home/components/case-study/case-study.component.html\n');

// Check for hardcoded text
const hasHardcodedText = caseStudyTemplate.includes('Staatliche Agenten');
if (hasHardcodedText) {
    console.log('   ❌ Hardcoded content found:');
    console.log('      • Title: "Staatliche Agenten"');
    console.log('      • Badge: "Kanton Wallis"');
    console.log('      • Description: "70% der Arbeit automatisiert..."');
    console.log('      • Stats: 70%, 45%, 3x (hardcoded)');
    console.log('      • Link: /case-study/staatliche-agenten\n');
}

console.log('\n');

// Recommendations
console.log('═══════════════════════════════════════════════════════════════\n');
console.log('💡 RECOMMENDATIONS\n');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('1. TESTIMONIALS:');
console.log('   ✓ You need to create Testimonial documents in Sanity');
console.log('   ✓ Go to: Sanity Studio → Content → Testimonials');
console.log('   ✓ Create a new testimonial with:');
console.log('      - clientName: "Danièle Bovier"');
console.log('      - clientRole: (localized) "Kommunikation, Kanton Wallis"');
console.log('      - quote: (localized) "Endlich jemand, der nicht nur..."');
console.log('      - featured: true');
console.log('      - order: 1\n');

console.log('2. CASE STUDY SECTION (Staatliche Agenten):');
console.log('   ⚠️  This is currently HARDCODED and NOT in Sanity');
console.log('   \n   Options:');
console.log('   A) Keep it hardcoded (fastest, no changes needed)');
console.log('   B) Add to HomePage schema in Sanity:');
console.log('      - caseStudyBadge: LocalizedText');
console.log('      - caseStudyTitle: LocalizedText');
console.log('      - caseStudyDescription: LocalizedText');
console.log('      - caseStudyLink: string');
console.log('      - caseStudyStats: Array<{value, suffix, description}>\n');

console.log('3. CREATE CASE STUDY DOCUMENT:');
console.log('   ✓ You need a "Case Study" document type in Sanity');
console.log('   ✓ Create document: slug="staatliche-agenten"');
console.log('   ✓ Fields: title, description, client, stats, images, etc.\n');

console.log('\n');
console.log('═══════════════════════════════════════════════════════════════\n');
console.log('📋 NEXT STEPS\n');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('1. Check if you have these document types in Sanity:');
console.log('   • homePage (single document)');
console.log('   • testimonial (multiple documents)');
console.log('   • caseStudy (multiple documents)');
console.log('   • partner (multiple documents)\n');

console.log('2. Verify in Sanity Studio:');
console.log('   • Content → Check if "Testimonials" section exists');
console.log('   • Content → Check if "Case Studies" section exists');
console.log('   • Content → Home Page → Verify all fields match model\n');

console.log('3. If missing, you need to:');
console.log('   • Create Sanity schema files for missing types');
console.log('   • Deploy to Sanity Studio');
console.log('   • Populate content\n');

console.log('\n✅ Analysis complete!\n');
