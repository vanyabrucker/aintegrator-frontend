/**
 * Audit Sanity Content - Check what exists in your Sanity project
 * Run: node audit-sanity-content.js
 */

const projectId = '4hvlh78z';
const dataset = 'production';

async function fetchFromSanity(query) {
    const url = `https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Sanity API error: ${response.statusText} - ${errorText}`);
    }

    return await response.json();
}

async function auditSanityContent() {
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('🔍 SANITY CONTENT AUDIT');
    console.log('═══════════════════════════════════════════════════════════════\n');

    try {
        // Check all document types
        console.log('📊 Checking Document Types...\n');

        const typesQuery = '*[]{_type} | order(_type) | {_type}';
        const typesResult = await fetchFromSanity(typesQuery);

        const uniqueTypes = [...new Set(typesResult.result.map(doc => doc._type))];

        console.log('✅ Found these document types:');
        uniqueTypes.forEach(type => {
            console.log(`   • ${type}`);
        });

        console.log('\n───────────────────────────────────────────────────────────────\n');

        // Check HomePage
        console.log('🏠 HOME PAGE CHECK\n');
        const homePageQuery = '*[_type == "homePage"][0]';
        const homePageResult = await fetchFromSanity(homePageQuery);

        if (homePageResult.result) {
            console.log('✅ Home Page exists');
            console.log('\n   Available fields:');
            const fields = Object.keys(homePageResult.result).filter(key => !key.startsWith('_'));
            fields.forEach(field => {
                console.log(`   • ${field}`);
            });

            // Check for missing fields
            const expectedFields = [
                'heroTitle', 'heroDescription', 'heroShowButton', 'heroButtonLabel',
                'ctaCardTitle', 'ctaCardDescription', 'ctaCardLinkText', 'ctaCardLinkUrl',
                'partners', 'processStepsTitle', 'processSteps',
                'securityCardTitle', 'securityCardDescription',
                'finalCtaTitle', 'finalCtaDescription',
                'finalCtaPrimaryBtnText', 'finalCtaPrimaryBtnLink',
                'finalCtaSecondaryBtnText', 'finalCtaSecondaryBtnLink'
            ];

            const missingFields = expectedFields.filter(field => !fields.includes(field));

            if (missingFields.length > 0) {
                console.log('\n   ⚠️  Missing fields:');
                missingFields.forEach(field => {
                    console.log(`   ✗ ${field}`);
                });
            } else {
                console.log('\n   ✓ All expected fields present!');
            }
        } else {
            console.log('❌ Home Page NOT FOUND');
        }

        console.log('\n───────────────────────────────────────────────────────────────\n');

        // Check Testimonials
        console.log('💬 TESTIMONIALS CHECK\n');
        const testimonialsQuery = '*[_type == "testimonial"]';
        const testimonialsResult = await fetchFromSanity(testimonialsQuery);

        if (testimonialsResult.result && testimonialsResult.result.length > 0) {
            console.log(`✅ Found ${testimonialsResult.result.length} testimonial(s)`);

            testimonialsResult.result.forEach((testimonial, index) => {
                console.log(`\n   Testimonial #${index + 1}:`);
                console.log(`   • Client: ${testimonial.clientName || 'N/A'}`);
                console.log(`   • Featured: ${testimonial.featured ? 'Yes' : 'No'}`);
                console.log(`   • Order: ${testimonial.order || 'N/A'}`);
                console.log(`   • Quote (DE): ${testimonial.quote?.de?.substring(0, 50) || 'N/A'}...`);
            });

            const featuredCount = testimonialsResult.result.filter(t => t.featured).length;
            console.log(`\n   Featured testimonials: ${featuredCount}`);

            if (featuredCount === 0) {
                console.log('   ⚠️  No featured testimonials found! Set featured=true on at least one.');
            }
        } else {
            console.log('❌ NO TESTIMONIALS FOUND');
            console.log('\n   Action needed:');
            console.log('   1. Add "testimonial" document type to Sanity schema');
            console.log('   2. Create testimonial document with:');
            console.log('      - clientName: "Danièle Bovier"');
            console.log('      - clientRole.de: "Kommunikation, Kanton Wallis"');
            console.log('      - quote.de: "Endlich jemand, der nicht nur Technik verkauft..."');
            console.log('      - featured: true');
        }

        console.log('\n───────────────────────────────────────────────────────────────\n');

        // Check Case Studies
        console.log('📂 CASE STUDIES CHECK\n');
        const caseStudiesQuery = '*[_type == "caseStudy"]';
        const caseStudiesResult = await fetchFromSanity(caseStudiesQuery);

        if (caseStudiesResult.result && caseStudiesResult.result.length > 0) {
            console.log(`✅ Found ${caseStudiesResult.result.length} case study/studies`);

            caseStudiesResult.result.forEach((cs, index) => {
                console.log(`\n   Case Study #${index + 1}:`);
                console.log(`   • Title: ${cs.title?.de || cs.title || 'N/A'}`);
                console.log(`   • Slug: ${cs.slug?.current || 'N/A'}`);
            });

            const staatlicheAgenten = caseStudiesResult.result.find(
                cs => cs.slug?.current === 'staatliche-agenten'
            );

            if (!staatlicheAgenten) {
                console.log('\n   ⚠️  "staatliche-agenten" case study not found!');
                console.log('   This is needed for the hardcoded link on home page.');
            }
        } else {
            console.log('❌ NO CASE STUDIES FOUND');
            console.log('\n   ⚠️  Warning:');
            console.log('   Home page has hardcoded link to /case-study/staatliche-agenten');
            console.log('   Create this case study or update the link!');
        }

        console.log('\n───────────────────────────────────────────────────────────────\n');

        // Check Partners
        console.log('🤝 PARTNERS CHECK\n');
        const partnersQuery = '*[_type == "partner"] | order(order asc)';
        const partnersResult = await fetchFromSanity(partnersQuery);

        if (partnersResult.result && partnersResult.result.length > 0) {
            console.log(`✅ Found ${partnersResult.result.length} partner(s)`);
            partnersResult.result.forEach((partner, index) => {
                console.log(`   ${index + 1}. ${partner.name}`);
            });
        } else {
            console.log('❌ NO PARTNERS FOUND');
            console.log('   Logo carousel on home page will be empty!');
        }

        console.log('\n───────────────────────────────────────────────────────────────\n');

        // Check Careers
        console.log('💼 CAREERS CHECK\n');
        const careersQuery = '*[_type == "career"]';
        const careersResult = await fetchFromSanity(careersQuery);

        if (careersResult.result && careersResult.result.length > 0) {
            console.log(`✅ Found ${careersResult.result.length} career position(s)`);
            careersResult.result.forEach((career, index) => {
                console.log(`   ${index + 1}. ${career.title?.de || career.title || 'N/A'}`);
            });
        } else {
            console.log('⚠️  No career positions found');
        }

        console.log('\n───────────────────────────────────────────────────────────────\n');

        // Check Team Members
        console.log('👥 TEAM MEMBERS CHECK\n');
        const teamQuery = '*[_type == "teamMember"] | order(order asc)';
        const teamResult = await fetchFromSanity(teamQuery);

        if (teamResult.result && teamResult.result.length > 0) {
            console.log(`✅ Found ${teamResult.result.length} team member(s)`);
            teamResult.result.forEach((member, index) => {
                console.log(`   ${index + 1}. ${member.name}`);
            });
        } else {
            console.log('⚠️  No team members found');
        }

        console.log('\n═══════════════════════════════════════════════════════════════');
        console.log('📋 SUMMARY');
        console.log('═══════════════════════════════════════════════════════════════\n');

        // Generate summary
        const checks = {
            'Home Page': homePageResult.result ? '✅' : '❌',
            'Testimonials': testimonialsResult.result?.length > 0 ? '✅' : '❌',
            'Case Studies': caseStudiesResult.result?.length > 0 ? '✅' : '❌',
            'Partners': partnersResult.result?.length > 0 ? '✅' : '❌',
            'Career Positions': careersResult.result?.length > 0 ? '✅' : '⚠️',
            'Team Members': teamResult.result?.length > 0 ? '✅' : '⚠️'
        };

        Object.entries(checks).forEach(([name, status]) => {
            console.log(`${status} ${name}`);
        });

        console.log('\n✅ = OK | ❌ = Missing (action required) | ⚠️ = Optional but recommended\n');

    } catch (error) {
        console.error('\n❌ Error during audit:', error.message);
        console.error('\nCheck:');
        console.error('1. Sanity API token is correct');
        console.error('2. Project ID and dataset are correct');
        console.error('3. You have read permissions\n');
    }
}

// Run the audit
auditSanityContent();
