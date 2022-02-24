type PluginType = 'RF' | 'CPF';

interface CnpjParamsDto {
    cnpj: string;
    plugin: PluginType
}

interface CpfParamsDto {
    cpf: string;
    "data-nascimento": string;
    plugin: PluginType;
}

type ParamsDto = CnpjParamsDto | CpfParamsDto;