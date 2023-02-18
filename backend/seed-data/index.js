var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { products } from './data';
export function insertSeedData(ks) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // Keystone API changed, so we need to check for both versions to get keystone
        const keystone = ks.keystone || ks;
        const adapter = ((_a = keystone.adapters) === null || _a === void 0 ? void 0 : _a.MongooseAdapter) || keystone.adapter;
        console.log(`🌱 Inserting Seed Data: ${products.length} Products`);
        const { mongoose } = adapter;
        for (const product of products) {
            console.log(`  🛍️ Adding Product: ${product.name}`);
            const { _id } = yield mongoose
                .model('ProductImage')
                .create({ image: product.photo, altText: product.description });
            product.photo = _id;
            yield mongoose.model('Product').create(product);
        }
        console.log(`✅ Seed Data Inserted: ${products.length} Products`);
        console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``);
        process.exit();
    });
}
