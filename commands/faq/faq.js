let {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
function createEmbed(data) {
    let embed = new EmbedBuilder()
        .setColor('DarkGreen')
        .setTitle(data.title)
        .setDescription(data.description);
    if (data.link) embed.setURL(data.link);
    if (data.img) embed.setImage(data.img);
    return embed;
}
let embeds = {
    enable: {
        title: 'I can\'t enable the module due to issues in required dependencies!',
        description: 'Make sure you have all the required dependency modules. On v14 you may need to manually install the beta for Midi-Qol and DAE!'
    },
    vision: {
        title: 'This spell doesn\'t block player vision but it should (Darkness, Fog cloud, etc.)!',
        description: 'Any spells/features with vision restriction work RAW mechanically. These automations are not intended to restrict player\'s vision. You may use the real darkness configuration on the spell to additionally blind the player.'
    },
    animation: {
        title: 'This feature/spell should have an animation, but I\'m not seeing it!',
        description: 'Any animations by Eskiemoh typically require JB2A Patreon and Jack Kerouac\'s animated spell effects. The latter must be manually installed with the manifest URL from Chris\'s fork, which is updated for v12+: <https://github.com/chrisk123999/animated-spell-effects-cartoon/releases/latest/download/module.json>',
        link: 'https://github.com/chrisk123999/chris-premades/wiki/FAQ#this-featurespell-should-have-an-animation-but-im-not-seeing-it'
    },
    'summon-image': {
        title: 'Summons don\'t have any avatar or token art!',
        description: 'Configure the summon with the CatKit, there are options for token and avatar images. Depending on the automation you may need to look at the generic automation tab.'
    },
    v14: {
        title: 'Is the module updated for v14?',
        description: 'The update is a work in progress. Pre-releases are available in the announcements channel. You may track progress here: <https://github.com/users/chrisk123999/projects/1>',
        link: 'https://github.com/users/chrisk123999/projects/1'
    },
    'sneak-attack': {
        title: 'Sneak attack doesn\'t work!!!',
        description: 'Please see the faq for troubleshooting sneak attack and follow it thoroughly before asking for further support. Sneak attack is well tested and most issues are fixed with the troubleshooting steps.',
        link: 'https://discord.com/channels/1089258451949064296/1268414349764989019/1475300325857562778'
    },
    ddbi: {
        title: 'I keep getting errors when munching with DDBI and CPR!',
        description: 'As of this FAQ, we do not have integration with DDBI for v14. Disable the "Use Cauldron of Plentiful Resources Automation?" checkbox in the DDB Muncher menu, Settings tab, General subtab.'
    },
    sources: {
        title: 'What do I do for automation sources?',
        description: 'Standard automation sources are CPR, GPS, & MISC (when used), then Midi sample items. You do not want DDB compendiums or official PHB/DMG/SRD etc modules selected. You have already used those compendiums to build your characters. This menu is for automations only, not content. Do NOT select other sources just to add more to the list!'
    },
    compendiums: {
        title: 'What do I do for compendium sources?',
        description: 'These compendiums are used when an automation needs an item, such as when the All-Purpose Tool automation adds a cantrip to your character sheet. You want compendiums with content and automations. Use the DDB compendiums after munching with automations. When using the PHB/DMG/SRD, it is recommended to use the compendium CatKit to duplicate and automate the compendium. This is most important for spells.'
    },
    settings: {
        title: 'I can\'t see the CPR settings!',
        description: 'As of this FAQ, CPR does not have any settings in v14. Most have been migrated to CAT or Side Effects and others have not been ported.'
    },
    'auto-roll-damage': {
        title: 'Do I have to enable auto roll damage? I like rolling damage manually!',
        description: 'For automations that affect damage or use the workflow, yes. We are not forcing you to change your settings, or to use automations. However, to receive support, you will be asked to fix your settings.'
    },
    cat: {
        title: 'What is CAT?',
        description: 'Coven\'s Automation Toolkit, a dependency of CPR in v14. CAT is the bus CPR drives to deliver your automations.'
    },
    'side-effects': {
        title: 'Where is the effect interface?',
        description: 'The effect interface and most other UI changes have been moved to another module: Side Effects. See: <https://foundryvtt.com/packages/side-effects>',
        link: 'https://foundryvtt.com/packages/side-effects'
    },
    macros: {
        title: 'Why are all my macros running when I load into the world?',
        description: 'Remove your macro compendiums from the CAT compendium setting. Only very specific macro compendiums should be selected there, those used to overwrite automation macros.'
    }
};
let commandBuilder = new SlashCommandBuilder().setName('faq').setDescription('Displays FAQ posts.');
for (let [name, config] of Object.entries(embeds)) {
    commandBuilder.addSubcommand(subCommand =>
        subCommand
            .setName(name)
            .setDescription(config.title.slice(0, 100))
    );
}
module.exports = {
    'data': commandBuilder,
    async execute(interaction) {
        let subCommand = interaction.options.getSubcommand();
        let embed = createEmbed(embeds[subCommand]);
        await interaction.reply({'embeds': [embed]});
    },
    'guild': 'cpr'
};