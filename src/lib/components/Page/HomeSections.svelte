<script lang="ts">
  import Card from '$lib/components/Card/Card.svelte';
  import ProjectCard from '$lib/components/ProjectCard/ProjectCard.svelte';
  import ExperienceCard from '$lib/components/ExperienceCard/ExperienceCard.svelte';
  import ContactForm from '$lib/components/Contact/ContactForm.svelte';
  import UIcon from '$lib/components/Icon/UIcon.svelte';
  import Icon from '$lib/components/Icon/Icon.svelte';
  import { HOME, PROJECTS, EXPERIENCES, RESUME, SKILLS } from '$lib/params';
  import { getPlatfromIcon } from '$lib/params';
  import { getAssetURL } from '$lib/data/assets';
  import { _ } from 'svelte-i18n';
  import { handleNavigation } from '$lib/utils/navigation';

  const skills = SKILLS.items;
  const projects = PROJECTS.items.filter((p) => !p.dont_show);
  const experiences = EXPERIENCES.items;
  const resumeLinks = RESUME.links;
  const socialLinks = HOME.links;
</script>

<section id="about" class="section container">
  <h2 class="section-title">{$_('NAVBAR.about')}</h2>
  <Card classes="w-full">
    <p class="text-base md:text-lg leading-relaxed">{$_('ABOUT.full_about')}</p>
  </Card>
  <div class="divider" aria-hidden="true"></div>
  <div class="cta-row">
    <Card onClick={(e) => handleNavigation(e, '/resume')}>{$_('RESUME.title')}</Card>
    <Card onClick={(e) => handleNavigation(e, '/contact')}>{$_('NAVBAR.contact')}</Card>
  </div>
  
</section>

<section id="skills" class="section container">
  <h2 class="section-title">{$_(SKILLS.title)}</h2>
  <div class="grid skills-grid">
    {#each skills as skill}
      <Card
        classes="decoration-none rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        style="cursor: pointer;"
        tiltDegree={1}
        onClick={(e) => handleNavigation(e, `/skills/${skill.slug}`)}
        bgImg={getAssetURL(skill.logo)}
      >
        <p class="skill-card-text">{$_(skill.name)}</p>
      </Card>
    {/each}
  </div>
</section>

<section id="projects" class="section container">
  <h2 class="section-title">{$_(PROJECTS.title)}</h2>
  <div class="grid projects-grid">
    {#each projects as project (project.slug)}
      <ProjectCard {project} />
    {/each}
  </div>
</section>

<section id="experience" class="section container">
  <h2 class="section-title">{$_(EXPERIENCES.title)}</h2>
  <div class="experience-list">
    {#each experiences as exp (exp.slug)}
      <ExperienceCard experience={exp} />
    {/each}
  </div>
</section>

<section id="resume" class="section container">
  <h2 class="section-title">{$_(RESUME.title)}</h2>
  <div class="resume-links">
    {#each resumeLinks as item}
      <Card onClick={(e) => handleNavigation(e, item.to)} classes="w-full">{$_(item.label)}</Card>
    {/each}
  </div>
</section>

<section id="contact" class="section container">
  <h2 class="section-title">{$_('NAVBAR.contact')}</h2>
  <div class="contact-layout">
    <div class="contact-form">
      <ContactForm />
    </div>
    <div class="contact-right">
      <Card classes="w-full">
        <h3 class="sub-title">{$_('CONTACT.connect_title')}</h3>
        <p class="mb-3">{$_('CONTACT.connect_description')}</p>
        <div class="social-links">
          {#each socialLinks as { platform, link }}
            <a href={link} target="_blank" rel="noopener noreferrer" class="social-link">
              <Icon icon={getPlatfromIcon(platform)} color={'var(--accent-text)'} size={'20px'} />
              <span>{platform}</span>
            </a>
          {/each}
        </div>
      </Card>
    </div>
  </div>
</section>

<style>
  .section { scroll-margin-top: 80px; padding: 40px 0; }
  .section-title { margin: 0 0 16px; }
  .sub-title { margin: 0 0 10px; }
  .divider { height: 1px; background: var(--border); margin: 16px 0; }
  .cta-row { display: flex; gap: 12px; flex-wrap: wrap; }

  .skills-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  .projects-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
  .experience-list { display: grid; gap: 16px; }
  .resume-links { display: grid; gap: 12px; }
  .skill-card-text { font-family: var(--title-f); font-weight: var(--fw-bold); color: var(--tertiary-text); }

  .contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .social-links { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }
  .social-link { display:flex; align-items:center; gap:10px; color: var(--tertiary-text); text-decoration:none; }

  @media (max-width: 1075px) {
    .skills-grid, .projects-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .contact-layout { grid-template-columns: 1fr; }
  }
  @media (max-width: 850px) {
    .skills-grid, .projects-grid { grid-template-columns: 1fr; }
  }
</style>


