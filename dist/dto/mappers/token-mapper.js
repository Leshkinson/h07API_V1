"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMapper = void 0;
class TokenMapper {
    static prepareModel(model) {
        return {
            id: model._id
        };
    }
}
exports.TokenMapper = TokenMapper;
//# sourceMappingURL=token-mapper.js.map